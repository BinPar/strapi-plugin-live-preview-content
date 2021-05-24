import React, { useEffect, useReducer, useRef } from "react";
import { Header, Inputs } from "@buffetjs/custom";
import {
  LoadingIndicatorPage,
  request,
} from "strapi-helper-plugin";
import { useIntl } from "react-intl";
import { isEqual } from "lodash";

import { getRequestUrl, getTrad } from "../../utils";
import Text from "../../components/Text";
import CodeBlock from "../../components/CodeBlock";
import SectionTitleWrapper from "./SectionTitleWrapper";
import Wrapper from "./Wrapper";
import init from "./init";
import reducer, { initialState } from "./reducer";

const SettingsPage = () => {
  const { formatMessage } = useIntl();
  const [reducerState, dispatch] = useReducer(reducer, initialState, init);
  const { initialData, isLoading, modifiedData } = reducerState.toJS();
  const isMounted = useRef(true);
  const getDataRef = useRef();
  const abortController = new AbortController();

  getDataRef.current = async () => {
    try {
      const { signal } = abortController;
      const { data } = await request(
        getRequestUrl("settings", { method: "GET", signal })
      );

      if (isMounted.current) {
        dispatch({
          type: "GET_DATA_SUCCEEDED",
          data,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDataRef.current();

    return () => {
      abortController.abort();
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    dispatch({
      type: "ON_CHANGE",
      keys: name,
      value,
    });
  };

  const handleSubmit = async () => {
    try {
      await request(getRequestUrl("settings"), {
        method: "PUT",
        body: modifiedData,
      });

      if (isMounted.current) {
        dispatch({
          type: "SUBMIT_SUCCEEDED",
        });
      }

      strapi.notification.toggle({
        type: "success",
        message: { id: "notification.form.success.fields" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const headerProps = {
    title: {
      label: formatMessage({ id: getTrad("settings.header.label") }),
    },
    content: formatMessage({
      id: getTrad("settings.sub-header.label"),
    }),
    actions: [
      {
        color: "cancel",
        disabled: isEqual(initialData, modifiedData),
        // TradId from the strapi-admin package
        label: formatMessage({ id: "app.components.Button.cancel" }),
        onClick: () => {
          dispatch({
            type: "CANCEL_CHANGES",
          });
        },
        type: "button",
      },
      {
        disabled: false,
        color: "success",
        // TradId from the strapi-admin package
        label: formatMessage({ id: "app.components.Button.save" }),
        onClick: handleSubmit,
        type: "button",
      },
    ],
  };

  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  return (
    <>
      <Header {...headerProps} />
      <Wrapper>
        <div className="container-fluid">
          <div className="row">
            <SectionTitleWrapper className="col-12">
              <Text fontSize="xs" fontWeight="semiBold" color="#787E8F">
                {formatMessage({
                  id: getTrad("settings.section.general.label"),
                })}
              </Text>
            </SectionTitleWrapper>
            <div className="col-12">
              <Inputs
                label={formatMessage({
                  id: getTrad("settings.form.baseUrl.label"),
                })}
                description={formatMessage({
                  id: getTrad("settings.form.baseUrl.description"),
                })}
                name="baseUrl"
                onChange={handleChange}
                type="text"
                value={modifiedData.baseUrl}
              />
            </div>
            <div className="col-12">
              <Inputs
                label={formatMessage({
                  id: getTrad("settings.form.previewUrl.label"),
                })}
                description={formatMessage({
                  id: getTrad("settings.form.previewUrl.description"),
                })}
                name="previewUrl"
                onChange={handleChange}
                type="text"
                value={modifiedData.previewUrl}
              />
            </div>
            <div className="col-12">
              <Text fontSize="md" fontWeight="semiBold" color="#333740">
                {formatMessage({
                  id: getTrad("settings.form.previewUrl.available"),
                })}
              </Text>

              <hr className="mt-0 mb-2" />

              <div>
                <div className="d-flex py-2 align-items-center">
                  <CodeBlock
                    fontSize="md"
                    color="#ffffff"
                    className="p-2 rounded"
                  >
                    :baseUrl
                  </CodeBlock>

                  <Text fontSize="md" color="#787E8F" className="ml-2">
                    {formatMessage({
                      id: getTrad(
                        "settings.form.previewUrl.available.baseUrl"
                      ),
                    })}
                  </Text>
                </div>
                <div className="d-flex py-2 align-items-center">
                  <CodeBlock
                    fontSize="md"
                    color="#ffffff"
                    className="p-2 rounded"
                  >
                    :contentType
                  </CodeBlock>

                  <Text fontSize="md" color="#787E8F" className="ml-2">
                    {formatMessage({
                      id: getTrad(
                        "settings.form.previewUrl.available.contentType"
                      ),
                    })}
                  </Text>
                </div>
                <div className="d-flex py-2 align-items-center">
                  <CodeBlock
                    fontSize="md"
                    color="#ffffff"
                    className="p-2 rounded"
                  >
                    :id
                  </CodeBlock>

                  <Text fontSize="md" color="#787E8F" className="ml-2">
                    {formatMessage({
                      id: getTrad("settings.form.previewUrl.available.id"),
                    })}
                  </Text>
                </div>
              </div>
            </div>
            <div className="col-12 mt-4">
              <Text fontSize="md" fontWeight="semiBold" color="#333740">
                {formatMessage({
                  id: getTrad("settings.form.previewUrl.example"),
                })}
              </Text>

              <hr className="mt-0 mb-2" />

              <div className="mt-3">
                <CodeBlock
                  fontSize="md"
                  color="#ffffff"
                  className="p-2 rounded"
                >
                  NextJS: {"<"}YOUR_URL{">"}
                  /api/preview?contentType=:contentType&id=:id
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SettingsPage;
