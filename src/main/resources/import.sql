INSERT INTO "PUBLIC"."THING" VALUES (1, 'WEB_SERVICE', 'thin 1', 'www.thin-1.com');
INSERT INTO "PUBLIC"."THING" VALUES (2, 'WEB_SERVICE', 'thin 2', 'wwww.thin-2.com');
INSERT INTO "PUBLIC"."THING" VALUES (3, 'WEB_SERVICE', 'thin 3', 'wwww.thin-3.com');

INSERT INTO "PUBLIC"."CLOUDEVENT" VALUES (1, 'JSON', NULL, 'event 1 description', 'event-1', 'thin-1.com', '1.0', 1, 'thin-1.event-1');
INSERT INTO "PUBLIC"."CLOUDEVENT" VALUES (2, 'JSON', NULL, 'event 2 description', 'event-2', 'thin-1.com', '1.0', 1, 'thin-1.event-2');
INSERT INTO "PUBLIC"."CLOUDEVENT" VALUES (3, 'JSON', NULL, 'event 3 description', 'event-3', 'thin-1.com', '1.0', 1, 'thin-1.event-3');
INSERT INTO "PUBLIC"."CLOUDEVENT" VALUES (4, 'JSON', NULL, 'event 4 description', 'event-4', 'thin-2.com', '1.0', 2, 'thin-2.event-4');

INSERT INTO "PUBLIC"."LISTENER" VALUES (1, NULL, 2, 'thin-2.listener-1');
INSERT INTO "PUBLIC"."LISTENER" VALUES (2, NULL, 2, 'thin-2.listener-2');
INSERT INTO "PUBLIC"."LISTENER" VALUES (3, NULL, 2, 'thin-2.listener-3');
INSERT INTO "PUBLIC"."LISTENER" VALUES (4, NULL, 2, 'thin-2.listener-4');
INSERT INTO "PUBLIC"."LISTENER" VALUES (5, NULL, 3, 'thin-2.listener-1');

-- INSERT INTO "PUBLIC"."EVENT_BINDING"(ID , EVENT , LISTENER) VALUES (1, 3, 1);
INSERT INTO "PUBLIC"."EVENT_BINDING"(EVENT , LISTENER) VALUES (1, 1);
INSERT INTO "PUBLIC"."EVENT_BINDING"(EVENT , LISTENER) VALUES (1, 2);
INSERT INTO "PUBLIC"."EVENT_BINDING"(EVENT , LISTENER) VALUES (1, 3);
-- to test uniqueness constraints
-- INSERT INTO "PUBLIC"."EVENT_BINDING"(EVENT , LISTENER) VALUES (1, 2);
INSERT INTO "PUBLIC"."EVENT_BINDING"(EVENT , LISTENER) VALUES (4, 3);
-- INSERT INTO "PUBLIC"."EVENT_BINDING"(EVENT , LISTENER) VALUES (2, 4);