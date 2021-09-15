import Response from './Response/Response';
import { JsonPrint } from 'components/custom-elements';

function ValidationReponse({ apiResponse }) {
   if (!apiResponse) {
      return null;
   }

   return (
      <div className="response">
         <div className="paper">
            <h4>Resultat</h4>
            <Response data={apiResponse} />
         </div>

         <div className="paper">
            <h4>Svar fra API</h4>
            <JsonPrint data={apiResponse} />
         </div>
      </div>
   );
}

export default ValidationReponse;