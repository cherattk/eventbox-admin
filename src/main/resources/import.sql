INSERT INTO "PUBLIC"."THING" VALUES (default, 'WEB_SERVICE', 'thing 1 description', 'T-1.com');
INSERT INTO "PUBLIC"."THING" VALUES (default, 'WEB_SERVICE', 'thing 2 description', 'T-2.com');
INSERT INTO "PUBLIC"."THING" VALUES (default, 'WEB_SERVICE', 'thing 3 decsription', 'T-3.com');

INSERT INTO "PUBLIC"."CLOUDEVENT" (id , thing_id, datacontenttype , dataschema , description , name, source , specversion , type) VALUES (default, 1, 'JSON', NULL, 'event 1 description', 'event-1', 'thing-1.com', '1.0', 'event-1');
INSERT INTO "PUBLIC"."CLOUDEVENT" (id , thing_id, datacontenttype , dataschema , description , name, source , specversion , type) VALUES (default, 1, 'JSON', NULL, 'event 2 description', 'event-2', 'thing-1.com', '1.0', 'event-2');
INSERT INTO "PUBLIC"."CLOUDEVENT" (id , thing_id, datacontenttype , dataschema , description , name, source , specversion , type) VALUES (default, 2, 'JSON', NULL, 'event 3 description', 'event-3', 'thing-2.com', '1.0', 'event-3');
INSERT INTO "PUBLIC"."CLOUDEVENT" (id , thing_id, datacontenttype , dataschema , description , name, source , specversion , type) VALUES (default, 3, 'JSON', NULL, 'event 4 description', 'event-4', 'thing-3.com', '1.0', 'event-4');

INSERT INTO "PUBLIC"."LISTENER" (id , thing_id , name , url) VALUES (default, 1 , NULL, 'T-1.listener-1');
INSERT INTO "PUBLIC"."LISTENER" (id , thing_id , name , url) VALUES (default, 1 , NULL, 'T-1.listener-2');
INSERT INTO "PUBLIC"."LISTENER" (id , thing_id , name , url) VALUES (default, 2 , NULL, 'T-2.listener-3');
INSERT INTO "PUBLIC"."LISTENER" (id , thing_id , name , url) VALUES (default, 2,  NULL, 'T-2.listener-4');
INSERT INTO "PUBLIC"."LISTENER" (id , thing_id , name , url) VALUES (default, 3 , NULL, 'T-3.listener-1');

--INSERT INTO "PUBLIC"."EVENT_BINDING" VALUES (default, 1, 1);
--INSERT INTO "PUBLIC"."EVENT_BINDING" VALUES (default, 1, 2);
--INSERT INTO "PUBLIC"."EVENT_BINDING" VALUES (default, 1, 3);
--INSERT INTO "PUBLIC"."EVENT_BINDING" VALUES (default, 4, 3);
