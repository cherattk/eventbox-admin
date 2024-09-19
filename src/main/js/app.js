import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ThingStore from './datastore/thingstore';
import EventBindingStore from './datastore/eventbindingstore';

import ContainerThing from './ui/thing/container';
import ContainerEventBinding from './ui/eventbinding/container';
// import ContainerActivity from './ui/activity/container';
import { Alert } from './ui/component/message';

function App() {
	return (
		<>
			<nav className="sidebar p-3 bg-light text-center border-end">
				<h1 className="h3 m-0 mb-3 pb-3 text-primary border-bottom">EventBox</h1>
				<ul className="nav nav-pills flex-column text-start" id="nav-tab" role="tablist">
					<li><a className="mb-1 nav-link active"
						data-bs-toggle="tab" href="#nav-thing" role="tab">
						<i className="bi bi-hdd-network-fill me-3 fs-5"></i>
						Things
					</a>
					</li>
					<li>
						<a className="mb-1 nav-link"
							data-bs-toggle="tab" href="#nav-eventbinding" role="tab">
							<i className="bi bi-diagram-3-fill me-3 fs-5"></i>
							Binding
						</a>
					</li>
					<li><a className="mb-1 nav-link"
						data-bs-toggle="tab" href="#nav-activity" role="tab">
						<i className="bi bi-activity me-3 fs-5"></i>
						Activity
					</a>
					</li>
				</ul>
			</nav>

			<div className="flex-grow-1 overflow-auto">

				<Alert />

				<div className="tab-content">
					<div className="tab-pane fade show active" id="nav-thing"
						role="tabpanel">
						<h2 className="bg-light h3 m-0 py-3 px-4 text-primary border-bottom">Thing Manager</h2>
						<ContainerThing />
					</div>
					<div className="tab-pane fade" id="nav-eventbinding"
						role="tabpanel">
						<h2 className="bg-light h3 m-0 py-3 px-4 text-primary border-bottom">Binding Manager</h2>
						<ContainerEventBinding />
					</div>
					<div className="tab-pane fade" id="nav-activity"
            role="tabpanel">
						<h2 className="bg-light h3 m-0 py-3 px-4 text-primary border-bottom">Activity View</h2>
						{/*<ContainerActivity />*/}
          </div> 
				</div>
			</div>
		</>

	);
}


///////////////////////////////////////////////////////////////////////////

const RootApp = createRoot(document.getElementById('app'));

///////////////////////////////////////////////////////////////////////////
ThingStore.loadThingStore(function() {
	ThingStore.loadEventStore(function() {
		ThingStore.loadListenerEndpointStore(function() {
			EventBindingStore.loadEventBindingStore(function() {
				// RootApp.render(<App />); // ==> Production MODE
				RootApp.render( // DEV Mode
					<StrictMode>
						<App />
					</StrictMode>
				);
			});
		});
	});
});


/*
 *   IF user has a valid auth token render the app()
 */
// function checkSession() {
//   var session_token = sessionStorage.getItem('eventbox_session');
//   if (!session_token || session_token == 'undefined') {
//     renderLoginForm();
//   }
//   else {
//     jQuery.ajax({
//       url: AdminerConfig.auth_token_url,
//       method: "GET",
//       headers: {
//         'Authorization': 'Bearer ' + session_token
//       },
//     }).done(function (responseData, textStatus, jqXHR) {
//       if (jqXHR.status === 200) {
//         renderConnectedState(responseData.auth_token);
//       }
//     }).fail(function () {
//       renderLoginForm();
//     });

//   }
// }

// // LOG OUT ACTION
// document.getElementById('logout').onclick = function (e) {

//   var sessionToken = sessionStorage.getItem('eventbox_session');
//   if (sessionToken) {
//     jQuery.ajax({
//       url: AdminerConfig.log_out_url,
//       method: "POST",
//       headers : {
//         Authorization : "Bearer " + sessionToken
//       }
//     }).done(function () {
//       renderLoginForm();
//       e.target.style.visibility = 'hidden';
//     }).fail(function (jqXHR, textStatus, errorThrown) {
//       console.error(errorThrown);
//     });
//   }
//   else{
//     renderLoginForm();
//     e.target.style.visibility = 'hidden';
//   }
// }

//////////////////////////////////////////////////////////////////////////

// checkSession();
// RenderApp();



