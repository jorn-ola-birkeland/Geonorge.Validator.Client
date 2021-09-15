import React from 'react';
import ReactDOMServer from "react-dom/server";
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import InfoIcon from 'assets/gfx/icon-info.svg';
import { showDialog } from 'store/slices/dialogSlice';
import { sendAsync } from 'utils/api';
import './RuleInfo.scss';

const RULES_URL = process.env.REACT_APP_RULES_URL;

function RuleInfo({ validator }) {  
   const dispatch = useDispatch();
   let ruleInfo = null;

   if (!validator) {
      return null;
   }

   async function showRuleInfo(event) {
      event.preventDefault();
      event.stopPropagation();

      const formData = new FormData();
      formData.append('namespace', validator.namespace);

      if (!ruleInfo) {
         const response = await sendAsync(RULES_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
         
         if (response === null) {
            return;
         }

         ruleInfo = response.flatMap(ruleSet => ruleSet.groups);
      }

      openDialog();
   }

   function openDialog() {
      const ruleCount = ruleInfo.reduce((total, group) => total + group.rules.length, 0);
      const body = ReactDOMServer.renderToStaticMarkup(renderDialogBody());

      dispatch(showDialog({ title: `${validator.name} - Valideringsregler (${ruleCount})`, body, className: 'rule-summary-dialog' }));
   }

   function renderDialogBody() {
      return (
         <div>
            {ruleInfo.map((group, index) => renderSummary(group, index))}
         </div>
      );
   }

   function renderSummary(group, index) {
      return (
         <div className="ruleset" key={'ruleset-' + index}>
            <h6>{group.name} ({group.rules.length})</h6>
            <div className="rules">
               {group.rules.map((rule, idx) => renderRule(rule, idx))}
            </div>
         </div>
      );
   }

   function renderRule(rule, index) {
      return (
         <div key={'rule-' + index} className="rule">
            <div className="type">
               <span className={`label label-${rule.messageType.toLowerCase()}`}>{rule.messageType}</span>
            </div>
            <div className="name">
               <div>
                  <span>{rule.name}</span>
                  {rule.documentation ? <a className="documentation" href={rule.documentation} target="_blank" rel="noreferrer">(Dokumentasjon)</a> : ''}
               </div>
               {rule.description ? <span className="description">{rule.description}</span> : ''}
            </div>
            <div className="id">{rule.id}</div>
         </div>
      )
   }

   return (
      <React.Fragment>
         <Button variant="link" onClick={showRuleInfo}>
            <img className="icon-info" src={InfoIcon} alt="Oversikt over valideringsregler" />Oversikt over valideringsregler
         </Button>
      </React.Fragment>
   );
}

export default RuleInfo;