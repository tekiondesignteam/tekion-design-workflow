/* ─────────────────────────────────────────────────────────────────────────────
   Tekion Design Workflow — Prototype Main Component Template
   Rename to [Slug].jsx. Fill every INJECT marker; do not edit bar JSX.
   All DS components referenced as window.ComponentName.
   All values via var(--component-*) / var(--semantic-*) tokens only.
───────────────────────────────────────────────────────────────────────────── */

/* INJECT:SCREEN_COMPONENTS
   Define each screen as a function component above the main component.
   One function per task, named [Flow][Task] (e.g. function HappyPathList() { ... }).
   Use only window.* DS components. No raw hex, px, rem, or font-family.
   Example:

   function HappyPathList() {
     return (
       <div className="prj-task-wrap">
         <window.Table ... />
       </div>
     );
   }
*/

/* INJECT:FLOWS
   Define the FLOWS array and SCREENS registry here.
   Example:

   const FLOWS = [
     { name: 'Happy Path', tasks: ['List', 'Detail', 'Confirm'] },
     { name: 'Error State', tasks: ['List', 'Error'] },
   ];

   const SCREENS = [
     [HappyPathList, HappyPathDetail, HappyPathConfirm],
     [ErrorStateList, ErrorStateError],
   ];
*/

/* INJECT:SLUG_OPEN
   Replace [Slug] with the PascalCase feature slug.

   function [Slug]() {
*/
function SLUG_PLACEHOLDER() {

  const [activeFlow, setActiveFlow] = React.useState(0);
  const [activeTask, setActiveTask] = React.useState(0);
  const [barVisible, setBarVisible] = React.useState(false);

  const flow   = FLOWS[activeFlow];
  const Screen = SCREENS[activeFlow][activeTask];

  const switchFlow = (i) => { setActiveFlow(i); setActiveTask(0); };

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* Restore tab — visible when bar is hidden (default) */}
      {!barVisible && (
        <div className="prj-proto-restore" onClick={() => setBarVisible(true)}>
          Switch Flows
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 2 }}>
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* Dark prototype bar */}
      {barVisible && (
        <div className="prj-proto-bar">
          {/* INJECT:FEATURE_NAME — replace the string below */}
          <span className="prj-proto-project">FEATURE NAME</span>
          <div className="prj-proto-sep" />

          <span className="prj-proto-flows-label">Flows</span>
          <div className="prj-proto-flows">
            {FLOWS.map((f, i) => (
              <div key={i}
                className={'prj-proto-flow-pill' + (activeFlow === i ? ' prj-proto-flow-pill--active' : '')}
                onClick={() => switchFlow(i)}>
                {f.name}
              </div>
            ))}
          </div>

          <button className="prj-proto-hide-btn" onClick={() => setBarVisible(false)} title="Hide bar">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 6.5L5 3.5L8 6.5" stroke="currentColor" strokeWidth="1.4"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* Page content */}
      <div className="prj-flow-page">
        <div className="prj-page-header">
          <span className="prj-page-title">{flow.name}</span>
        </div>
        <div className="prj-task-wrap">
          <Screen />
        </div>
      </div>

    </div>
  );
}

/* INJECT:SLUG_EXPORT
   Replace [Slug] with the PascalCase feature slug.

   window.[Slug] = [Slug];
*/
window.SLUG_PLACEHOLDER = SLUG_PLACEHOLDER;
