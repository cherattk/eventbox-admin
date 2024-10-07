INSERT INTO "PUBLIC"."THING" (thing_id , name , category , description) VALUES (default, 'Web Service 1' , 'WEB_SERVICE', 'web service  1 description');
INSERT INTO "PUBLIC"."THING" (thing_id , name , category , description) VALUES (default, 'Web Service 2' , 'WEB_SERVICE', 'web service 2 description');
INSERT INTO "PUBLIC"."THING" (thing_id , name , category , description) VALUES (default, 'Device 1', 'DEVICE', 'Device 1 decsription');

INSERT INTO "PUBLIC"."CLOUDEVENT" (id , thing_id, source , specversion , type, name, datacontenttype , dataschema , description) VALUES (default, 1, 'com.company.service-1', '1.0', 'event.type.1' , 'event-1', 'application/json', '', 'event 1 description');
INSERT INTO "PUBLIC"."CLOUDEVENT" (id , thing_id , source , specversion , type , name, datacontenttype , dataschema , description) VALUES (default, 1, 'com.company.service-1', '1.0', 'event.type.2', 'event-2','application/json', '', 'event 2 description');
INSERT INTO "PUBLIC"."CLOUDEVENT" (id , thing_id , source , specversion , type , name, datacontenttype , dataschema , description) VALUES (default, 2, 'com.company.service-2', '1.0', 'event.type.3', 'event-3', 'application/json', '', 'event 3 description');
INSERT INTO "PUBLIC"."CLOUDEVENT" (id , thing_id , source , specversion , type, name, datacontenttype , dataschema , description) VALUES (default, 3, 'com.company.device-1', '1.0', 'event.type.4', 'event-4','application/json', '', 'event 4 description');

INSERT INTO "PUBLIC"."LISTENER" (id , thing_id , name , url) VALUES (default, 1 , 'listener 1', 'http://localhost:3001/listener-endpoint');
INSERT INTO "PUBLIC"."LISTENER" (id , thing_id , name , url) VALUES (default, 2 , 'listener 2', 'http://localhost:3002/listener-endpoint');
INSERT INTO "PUBLIC"."LISTENER" (id , thing_id , name , url) VALUES (default, 3 , 'listener 3', 'http://localhost:3003/listener-endpoint');
