create view "Intent Daily Summary" as
  SELECT
    summary."Source",
    summary."Agent ID",
    summary."Agent Name",
    summary."Date",
    summary."Weekday",
    summary."Intent ID",
    summary."Intent",
    summary."No of Session",
    summary."No of Interaction",
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
          t."Weekday",
          t."Intent ID",
          t."Intent",
          count(DISTINCT t.session_id) AS "No of Session",
          sum(t.interaction_count)     AS "No of Interaction"
        FROM (SELECT
                messages.source                                                 AS "Source",
                messages.agent_id                                               AS "Agent ID",
                messages.agent_name                                             AS "Agent Name",
                date_trunc('day' :: text, messages.detect_intent_datetime)      AS "Date",
                concat('(', date_part('dow' :: text, messages.detect_intent_datetime), ') ',
                       to_char(messages.detect_intent_datetime, 'Day' :: text)) AS "Weekday",
                messages.intent_id                                              AS "Intent ID",
                messages.intent_name                                            AS "Intent",
                messages.session_id,
                1                                                               AS interaction_count
              FROM messages) t
        GROUP BY t."Source", t."Agent ID", t."Agent Name", t."Date", t."Weekday", t."Intent ID", t."Intent") summary;

