import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import '../../index.css';

function NumberConverter() {

   const [denaryInput, setDeneryInput] = useState('');
   const [romanValue, setRomanValue] = useState('');
   const [timeLink, setTimeLink] = useState('');
   const [showError, setShowError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   // Function converting the numeral value into the roman numeral form
   function convertNumeral(event) {
      event.preventDefault();
      setShowError(false);

      let map = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
      let romanString = ''
      const linkNumber = Math.abs(denaryInput)
      let tempNumber = linkNumber

      if (denaryInput == 0) {
         setRomanValue("Nulla");
         setTimeLink("")
         return
      }

      if (denaryInput > 9999 || denaryInput < 0) {
         setErrorMessage("The number must be between 0 and 9999");
         setShowError(true);
         setTimeLink("")
         setRomanValue("Nulla");
         return
      }

      for (let i of Object.keys(map)) {
         let numeral = Math.floor(tempNumber / map[i]);
         tempNumber -= numeral * map[i];
         romanString += i.repeat(numeral);
      }
      setRomanValue(romanString);
      
      buildWikiLink(event, linkNumber);
      
   }

   // function producing the wikipedia link to the year the numerals relate to
   function buildWikiLink(event, yearNumber) {
      event.preventDefault();

      setTimeLink("https://en.wikipedia.org/wiki/" + yearNumber +"_BC");
   }

   return (
      <div data-testid="number-converter">
         <h2 data-testid="number-converter-title">Denary to Roman Numeral Converter</h2>
         <form>
            <Form.Group className="mb-3">
               <Form.Label data-testid="number-converter-form-title">Denary Number</Form.Label>
               <Form.Control data-testid="number-converter-form-field" onChange={(e) => {setDeneryInput(e.target.value)}} type="number" name="denaryInput" placeholder="100"/>
            </Form.Group>
            <Button data-testid="number-converter-form-submit" className="mb-3" onClick={ (e) => convertNumeral(e)} variant="primary" type="submit">
               Convert
            </Button>
         </form>
         { showError ? 
            <Alert data-testid="number-converter-form-alert" className="mb-3" key="warning" variant="warning">
            {errorMessage}
            </Alert>
         : null }
         { (!showError && romanValue) ?
            <div>
               <h3 data-testid="number-converter-output-title">
                  Roman Numeral Convertion
               </h3>
               <p data-testid="number-converter-output-value">
                  {romanValue}
               </p>
            </div>
         : null }
         { (!showError && timeLink) ?
            <a data-testid="number-converter-hyperlink" href={timeLink} target="_blank">
               On this year BCE (Before Common Era)
            </a>
         : null }

      </div>
   )
};

NumberConverter.propTypes = {};

NumberConverter.defaultProps = {};

export default NumberConverter;
