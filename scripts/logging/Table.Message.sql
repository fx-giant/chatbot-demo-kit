CREATE DATABASE chat_logs;

/*CREATE SCHEMA public;*/

create table messages
(
  id                     char(36)  not null
    constraint messages_id_pk_2
    primary key
    constraint messages_id_pk
    unique,
  session                text,
  response_type          text,
  source                 text,
  agent_name             text,
  intent_name            text,
  parameters             json,
  response_message       text,
  response_object        json,
  raw_request            json,
  raw_response           json,
  detect_intent_datetime timestamp,
  logged_datetime        timestamp,
  agent_id               text,
  intent_id              text,
  request_message        text,
  output_context         json,
  exception              json,
  is_fallback            boolean,
  session_id             char(500),
  is_handover            boolean   not null,
  index                  bigserial not null
);

create index messages_index_index
  on messages (index);

