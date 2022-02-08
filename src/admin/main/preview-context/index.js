import PropTypes from "prop-types";
import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import { useIntl } from "react-intl";
import { request, PopUpWarning } from "strapi-helper-plugin";

import { get, isEmpty, isEqual, isArray, isObject, cloneDeep } from "lodash";

const CONTENT_MANAGER_PLUGIN_ID = "content-manager";

const PreviewContext = createContext(undefined);

const helperCleanData = (value, key) => {
  if (isArray(value)) {
    return value.map((obj) => (obj[key] ? obj[key] : obj));
  }
  if (isObject(value)) {
    return value[key];
  }

  return value;
};

const cleanData = (retrievedData, currentSchema, componentsSchema) => {
  const getType = (schema, attrName) =>
    get(schema, ["attributes", attrName, "type"], "");
  const getOtherInfos = (schema, arr) =>
    get(schema, ["attributes", ...arr], "");

  const recursiveCleanData = (data, schema) => {
    return Object.keys(data).reduce((acc, current) => {
      const attrType = getType(schema, current);
      const value = get(data, current);
      const component = getOtherInfos(schema, [current, "component"]);
      const isRepeatable = getOtherInfos(schema, [current, "repeatable"]);
      let cleanedData;

      switch (attrType) {
        case "json":
          try {
            cleanedData = JSON.parse(value);
          } catch (err) {
            cleanedData = value;
          }

          break;
        case "date":
          cleanedData =
            value && value._isAMomentObject === true
              ? value.format("YYYY-MM-DD")
              : value;
          break;
        case "datetime":
          cleanedData =
            value && value._isAMomentObject === true
              ? value.toISOString()
              : value;
          break;
        case "media":
          if (getOtherInfos(schema, [current, "multiple"]) === true) {
            cleanedData = value
              ? value.filter((file) => !(file instanceof File))
              : null;
          } else {
            cleanedData =
              get(value, 0) instanceof File ? null : get(value, "id", null);
          }
          break;
        case "component":
          if (isRepeatable) {
            cleanedData = value
              ? value.map((data) => {
                  const subCleanedData = recursiveCleanData(
                    data,
                    componentsSchema[component]
                  );

                  return subCleanedData;
                })
              : value;
          } else {
            cleanedData = value
              ? recursiveCleanData(value, componentsSchema[component])
              : value;
          }
          break;
        case "dynamiczone":
          cleanedData = value.map((componentData) => {
            const subCleanedData = recursiveCleanData(
              componentData,
              componentsSchema[componentData.__component]
            );

            return subCleanedData;
          });
          break;
        default:
          // The helper is mainly used for the relations in order to just send the id
          cleanedData = helperCleanData(value, "id");
      }

      acc[current] = cleanedData;

      return acc;
    }, {});
  };

  return recursiveCleanData(retrievedData, currentSchema);
};

const removeKeyInObject = (obj, keyToRemove) => {
  if (!obj) {
    return obj;
  }

  return Object.keys(obj).reduce((acc, current) => {
    const value = acc[current];

    if (value === null) {
      return acc;
    }

    if (Array.isArray(value)) {
      if (Array.isArray(acc)) {
        acc[current] = removeKeyInObject(value, keyToRemove);

        return acc;
      }

      return {
        ...acc,
        [current]: value.map((obj) => removeKeyInObject(obj, keyToRemove)),
      };
    }

    if (typeof value === "object") {
      if (value._isAMomentObject === true) {
        return { ...acc, [current]: value };
      }

      if (Array.isArray(acc)) {
        acc[current] = removeKeyInObject(value, keyToRemove);

        return acc;
      }

      return { ...acc, [current]: removeKeyInObject(value, keyToRemove) };
    }

    if (current === keyToRemove) {
      delete acc[current];
    }

    return acc;
  }, obj);
};

export const PreviewProvider = (props) => {
  const {
    componentLayouts,
    children,
    initialData,
    isCreatingEntry,
    layout,
    modifiedData,
    slug,
    canUpdate,
    canCreate,
    getPreviewUrlParams = () => ({}),
  } = props;
  console.log(props);
  const { formatMessage } = useIntl();

  const [showWarningClone, setWarningClone] = useState(false);
  const [showWarningPublish, setWarningPublish] = useState(false);
  const [previewable, setIsPreviewable] = useState(false);
  const [isButtonLoading, setButtonLoading] = useState(false);

  const toggleWarningClone = () => setWarningClone((prevState) => !prevState);
  const toggleWarningPublish = () =>
    setWarningPublish((prevState) => !prevState);

  useEffect(() => {
    request(`/preview-content/is-previewable/${layout.apiID}`, {
      method: "GET",
    }).then(({ isPreviewable }) => {
      setIsPreviewable(isPreviewable);
    });
  }, [layout.apiID]);

  const didChangeData = useMemo(() => {
    return (
      !isEqual(initialData, modifiedData) ||
      (isCreatingEntry && !isEmpty(modifiedData))
    );
  }, [initialData, isCreatingEntry, modifiedData]);

  const createFormData = useCallback(
    (data) => {
      // First we need to remove the added keys needed for the dnd
      const preparedData = removeKeyInObject(cloneDeep(data), "__temp_key__");
      // Then we need to apply our helper
      const cleanedData = cleanData(preparedData, layout, componentLayouts);

      return cleanedData;
    },
    [componentLayouts, layout]
  );

  const previewHeaderActions = useMemo(() => {
    const headerActions = [];

    if (
      previewable &&
      ((isCreatingEntry && canCreate) || (!isCreatingEntry && canUpdate))
    ) {
      const params = getPreviewUrlParams(initialData, modifiedData, layout);
      headerActions.push({
        disabled: didChangeData,
        label: formatMessage({
          id: getPreviewPluginTrad("containers.Edit.preview"),
        }),
        color: "secondary",
        onClick: async () => {
          try {
            const data = await request(
              `/preview-content/preview-url/${layout.apiID}/${initialData.id}`,
              {
                method: "GET",
                params,
              }
            );

            if (data.url) {
              const body = createFormData(modifiedData);
              const res = await fetch(data.url, {
                method: "POST",
                body: JSON.stringify(body),
                mode: 'no-cors',
                headers: {
                'Content-Type': 'application/json',
                },
              });
              console.log({ data, body, res });

              if (res) {
                window.open(res, "_blank");
              }
            } else {
              strapi.notification.error(
                getPreviewPluginTrad("error.previewUrl.notFound")
              );
            }
          } catch (_e) {
            console.log("Error previewing:", _e.stack || _e.message || _e);
            strapi.notification.error(
              getPreviewPluginTrad("error.previewUrl.notFound")
            );
          }
        },
        type: "button",
        style: {
          paddingLeft: 15,
          paddingRight: 15,
          fontWeight: 600,
          minWidth: 100,
        },
      });
    }

    return headerActions;
  }, [
    didChangeData,
    formatMessage,
    layout.apiID,
    previewable,
    initialData.cloneOf,
    initialData.id,
    canCreate,
    canUpdate,
    isCreatingEntry,
  ]);

  const handleConfirmPreviewClone = async () => {
    try {
      // Show the loading state
      setButtonLoading(true);

      strapi.notification.success(getPreviewPluginTrad("success.record.clone"));

      window.location.replace(getFrontendEntityUrl(slug, initialData.id));
    } catch (err) {
      console.log(err);
      const errorMessage = get(
        err,
        "response.payload.message",
        formatMessage({ id: getPreviewPluginTrad("error.record.clone") })
      );

      strapi.notification.error(errorMessage);
    } finally {
      setButtonLoading(false);
      toggleWarningClone();
    }
  };

  const handleConfirmPreviewPublish = async () => {
    try {
      // Show the loading state
      setButtonLoading(true);

      let targetId = initialData.cloneOf.id;
      const urlPart = getRequestUrl(slug);
      const body = prepareToPublish({
        ...initialData,
        id: targetId,
        cloneOf: null,
      });

      await request(`${urlPart}/${targetId}`, {
        method: "PUT",
        body,
      });
      await request(`${urlPart}/${initialData.id}`, {
        method: "DELETE",
      });

      strapi.notification.success(
        getPreviewPluginTrad("success.record.publish")
      );

      window.location.replace(getFrontendEntityUrl(slug, targetId));
    } catch (err) {
      const errorMessage = get(
        err,
        "response.payload.message",
        formatMessage({ id: getPreviewPluginTrad("error.record.publish") })
      );

      strapi.notification.error(errorMessage);
    } finally {
      setButtonLoading(false);
      toggleWarningPublish();
    }
  };

  const value = {
    previewHeaderActions,
  };

  return (
    <>
      <PreviewContext.Provider value={value}>
        {children}
      </PreviewContext.Provider>
      {previewable && (
        <PopUpWarning
          isOpen={showWarningClone}
          toggleModal={toggleWarningClone}
          content={{
            message: getPreviewPluginTrad("popUpWarning.warning.clone"),
            secondMessage: getPreviewPluginTrad(
              "popUpWarning.warning.clone-question"
            ),
          }}
          popUpWarningType="info"
          onConfirm={handleConfirmPreviewClone}
          isConfirmButtonLoading={isButtonLoading}
        />
      )}
      {previewable && (
        <PopUpWarning
          isOpen={showWarningPublish}
          toggleModal={toggleWarningPublish}
          content={{
            message: getPreviewPluginTrad("popUpWarning.warning.publish"),
            secondMessage: getPreviewPluginTrad(
              "popUpWarning.warning.publish-question"
            ),
          }}
          popUpWarningType="info"
          onConfirm={handleConfirmPreviewPublish}
          isConfirmButtonLoading={isButtonLoading}
        />
      )}
    </>
  );
};

export const usePreview = () => {
  const context = useContext(PreviewContext);

  if (context === undefined) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }

  return context;
};

/**
 * Should remove ID's from components -
 * could modify only already attached componetns (with proper ID)
 * or create new one - in that case removing id will create new one
 * @param {object} payload
 */
function prepareToPublish(payload) {
  if (Array.isArray(payload)) {
    payload.forEach(prepareToPublish);
  } else if (payload && payload.constructor === Object) {
    // eslint-disable-next-line no-prototype-builtins
    if (payload.hasOwnProperty("__component")) {
      delete payload.id;
    }
    Object.values(payload).forEach(prepareToPublish);
  }

  return payload;
}

const getRequestUrl = (path) =>
  `/${CONTENT_MANAGER_PLUGIN_ID}/explorer/${path}`;
const getFrontendEntityUrl = (path, id) =>
  `/admin/plugins/${CONTENT_MANAGER_PLUGIN_ID}/collectionType/${path}/create/clone/${id}`;

const getPreviewPluginTrad = (id) => `preview-content.${id}`;

PreviewProvider.propTypes = {
  children: PropTypes.node.isRequired,
  canUpdate: PropTypes.bool.isRequired,
  canCreate: PropTypes.bool.isRequired,
  initialData: PropTypes.object.isRequired,
  isCreatingEntry: PropTypes.bool.isRequired,
  layout: PropTypes.object.isRequired,
  modifiedData: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  getPreviewUrlParams: PropTypes.func,
};
