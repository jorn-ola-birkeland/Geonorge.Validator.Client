import React from 'react';
import ResponseBlock from '../ResponseBlock/ResponseBlock';
import './Response.scss';

function Response({ data }) {
   if (!data) {
      return null;
   }

   const rulesWithMessages = data.rules.filter(rule => rule.messages.length > 0);
   const passedRules = data.rules.filter(rule => rule.status === 'PASSED');
   const skippedRules = data.rules.filter(rule => rule.status === 'NOT_EXECUTED');
   const rulesCheckedCount = rulesWithMessages.length + passedRules.length;
   const timeUsed = data.timeUsed.toString().replace('.', ',');

   return (
      <React.Fragment>
         <div className="summary">
            <div className="row">
               <div className="col-3">Datasett:</div>
               <div className="col-9">{data.files.join(', ')}</div>
            </div>
            <div className="row">
               <div className="col-3">Antall feil:</div>
               <div className="col-9">{data.errors}</div>
            </div>
            <div className="row">
               <div className="col-3">Antall advarsler:</div>
               <div className="col-9">{data.warnings}</div>
            </div>
            <div className="row">
               <div className="col-3">Antall regler sjekket:</div>
               <div className="col-9">{rulesCheckedCount}</div>
            </div>
            <div className="row">
               <div className="col-3">Antall regler totalt:</div>
               <div className="col-9">{data.rules.length}</div>
            </div>
            <div className="row">
               <div className="col-3">Tidsbruk:</div>
               <div className="col-9">{timeUsed} sek.</div>
            </div>
         </div>

         <ResponseBlock list={rulesWithMessages} title="Regler med feil eller advarsler" expandable={false} maxHeight={false} />
         <ResponseBlock list={passedRules} title="Validerte regler" />
         <ResponseBlock list={skippedRules} title="Regler som ikke er sjekket" />
      </React.Fragment>
   );
}

export default Response