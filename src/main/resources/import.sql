INSERT INTO "PUBLIC"."THING" VALUES (default, 'WEB_SERVICE', 'thin 1', 'www.thin-1.com');
INSERT INTO "PUBLIC"."THING" VALUES (default, 'WEB_SERVICE', 'thin 2', 'wwww.thin-2.com');
INSERT INTO "PUBLIC"."THING" VALUES (default, 'WEB_SERVICE', 'thin 3', 'wwww.thin-3.com');

INSERT INTO "PUBLIC"."CLOUDEVENT" VALUES (default, 'JSON', NULL, 'event 1 description', 'event-1', 'thin-1.com', '1.0', 1, 'thin-1.event-1');
INSERT INTO "PUBLIC"."CLOUDEVENT" VALUES (default, 'JSON', NULL, 'event 2 description', 'event-2', 'thin-1.com', '1.0', 1, 'thin-1.event-2');
INSERT INTO "PUBLIC"."CLOUDEVENT" VALUES (default, 'JSON', NULL, 'event 3 description', 'event-3', 'thin-1.com', '1.0', 1, 'thin-1.event-3');
INSERT INTO "PUBLIC"."CLOUDEVENT" VALUES (default, 'JSON', NULL, 'event 4 description', 'event-4', 'thin-2.com', '1.0', 2, 'thin-2.event-4');

INSERT INTO "PUBLIC"."LISTENER" VALUES (default, NULL, 2, 'thin-2.listener-1');
INSERT INTO "PUBLIC"."LISTENER" VALUES (default, NULL, 2, 'thin-2.listener-2');
INSERT INTO "PUBLIC"."LISTENER" VALUES (default, NULL, 2, 'thin-2.listener-3');
INSERT INTO "PUBLIC"."LISTENER" VALUES (default, NULL, 2, 'thin-2.listener-4');
INSERT INTO "PUBLIC"."LISTENER" VALUES (default, NULL, 3, 'thin-3.listener-1');    

--INSERT INTO "PUBLIC"."EVENT_BINDING" VALUES (default, 1, 1);
--INSERT INTO "PUBLIC"."EVENT_BINDING" VALUES (default, 1, 2);
--INSERT INTO "PUBLIC"."EVENT_BINDING" VALUES (default, 1, 3);
--INSERT INTO "PUBLIC"."EVENT_BINDING" VALUES (default, 4, 3);
