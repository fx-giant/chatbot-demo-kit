create view "Chat Hourly Summary" as
  SELECT
    summary."Source",
    summary."Agent ID",
    summary."Agent Name",
    summary."Date",
    summary."Hour",
    summary."Weekday",
    summary."No of Session",
    summary."No of Handover",
    summary."No of Interaction",
    summary."No of Fallback",
    CASE
    WHEN (summary."No of Session" > 0)
      THEN (summary."No of Interaction" / summary."No of Session")
    ELSE (0) :: bigint
    END AS "No of Interaction per Session"
  FROM (SELECT
          t."Source",
          t."Agent ID",
          t."Agent Name",
          t."Date",
          t."Hour",
          t."Weekday",
          count(DISTINCT t.session_id) AS "No of Session",
          sum(t.is_handover)           AS "No of Handover",
          sum(t.interaction_count)     AS "No of Interaction",
          sum(t.is_fallback)           AS "No of Fallback"
        FROM (SELECT
                messages.source                                                 AS "Source",
                messages.agent_id                                               AS "Agent ID",
                messages.agent_name                                             AS "Agent Name",
                date_trunc('day' :: text, messages.detect_intent_datetime)      AS "Date",
                date_part('hour' :: text, messages.detect_intent_datetime)      AS "Hour",
                concat('(', date_part('dow' :: text, messages.detect_intent_datetime), ') ',
                       to_char(messages.detect_intent_datetime, 'Day' :: text)) AS "Weekday",
                messages.session_id,
                CASE
                WHEN (messages.is_fallback = true)
                  THEN 1
                ELSE 0
                END                                                             AS is_fallback,
                CASE
                WHEN (messages.is_handover = true)
                  THEN 1
                ELSE 0
                END                                                             AS is_handover,
                1                                                               AS interaction_count
              FROM messages) t
        GROUP BY t."Source", t."Agent ID", t."Agent Name", t."Date", t."Hour", t."Weekday") summary;

