import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@saleor/components/CardTitle";
import ControlledCheckbox from "@saleor/components/ControlledCheckbox";
import Hr from "@saleor/components/Hr";
import React from "react";
import { useIntl } from "react-intl";
import { WebhookEventTypeEnum } from "../../../types/globalTypes";

interface WebhookEventsProps {
  data: {
    allEvents: boolean;
    events: string[];
  };
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>, cb?: () => void) => void;
}

const WebhookEvents: React.StatelessComponent<WebhookEventsProps> = ({
  data,
  disabled,
  onChange
}) => {
  const intl = useIntl();
  const eventsEnum = Object.values(WebhookEventTypeEnum);

  const handleAllEventsChange = (event: React.ChangeEvent<any>) =>
    onChange(event, () =>
      onChange({
        target: {
          name: "events",
          value: event.target.value ? eventsEnum.map(event => event) : []
        }
      } as any)
    );
  const handleEventsChange = (event: React.ChangeEvent<any>) => {
    onChange({
      target: {
        name: "events",
        value: event.target.value
          ? data.events.concat([event.target.name])
          : data.events.filter(events => events !== event.target.name)
      }
    } as any);
  };

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Events",
          description: "section header"
        })}
      />
      <CardContent>
        <Typography>
          {intl.formatMessage({
            defaultMessage:
              "Expand or restrict webhooks permissions to register certain events in Saleor system.",
            description: "webhook events"
          })}
        </Typography>
        <ControlledCheckbox
          checked={data.allEvents}
          disabled={disabled}
          label={intl.formatMessage({
            defaultMessage: "All events",
            description: "checkbox label"
          })}
          name="allEvents"
          onChange={handleAllEventsChange}
        />
        <Hr />
        {!data.allEvents &&
          eventsEnum.map((event, index) => {
            if (index !== 0) {
              return (
                <div key={index}>
                  <ControlledCheckbox
                    checked={data.events.includes(event)}
                    disabled={disabled}
                    label={event.replace(/\./, "")}
                    name={event}
                    onChange={handleEventsChange}
                  />
                </div>
              );
            }
          })}
      </CardContent>
    </Card>
  );
};
WebhookEvents.displayName = "WebhookEvents";
export default WebhookEvents;