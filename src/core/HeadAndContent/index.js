import { Button } from "antd";
import React from "react";
import Text from "../Text/Text";

const HeadAndContent = ({ heading, btn, children, styles = "" }) => {
  return (
    <div
      className={`pl-[88px] pr-15 py-30 w-full  flex flex-col space-y-40 ${styles} max-md:px-10 max-sm:px-10   max-md:ml-0 `}
    >
      <div className="flex items-center space-x-40  max-md:flex-col max-md:space-x-0 max-md:items-start max-sm:mb-10">
        <Text type="h3" bold>
          {heading}
        </Text>
        {btn && (
          <Button
            type="primary"
            className="rounded-10"
            danger
            size="medium"
            onClick={btn.buttonHandler}
          >
            {btn.name}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

export default HeadAndContent;
