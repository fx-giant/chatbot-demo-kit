CREATE SCHEMA public;

CREATE DATABASE chat_logs;


create table public.messages
(
	id char(36) not null,
	session text null,
	response_type text null,
	source text null,
	agent_name text null,
	intent_name text null,
	parameters json null,
	response_message text null,
	response_object json null,
	raw_request json null,
	raw_response json null,
	detect_intent_datetime timestamp null,
	logged_datetime timestamp null,
	agent_id text null,
	intent_id text null,
	request_message text null,
	output_context json null,
	exception json null,
	is_fallback tinyint(1) null,
	session_id char(500) null,
	is_handover tinyint(1) not null,
	`index` int auto_increment
		primary key,
	constraint messages_id_uindex
		unique (id)
)


