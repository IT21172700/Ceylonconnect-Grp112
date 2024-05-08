import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import "./styles.css";

export default function CurrencyConvertor() {
  // the states for the fields
  const [date, Setdate] = useState();
  const [sourceCurrency, setsourceCurrency] = useState('');
  const [targetCurrency, settargetCurrency] = useState('');
  const [amountInSourceCurrency, setamountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setamountInTargetCurrency] = useState(0);
  const [sourceCurrencyName, setsourceCurrencyName] = useState('');
  const [targetCurrencyName, settargetCurrencyName] = useState('');
  const [currencyNames, setcurrencyNames] = useState([]);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const getTheCurrencies = async () => {
      try {
        const responce = await axios.get(
          'http://localhost:8080/convertor/getAllCurrencies'
        );
        setcurrencyNames(responce.data);
      } catch (err) {
        console.error(err);
      }
    };
    getTheCurrencies();
  }, []);

  // onSubmit
  const getTheTargetAmount = async (event) => {
    event.preventDefault();
    setPressed(true);
    // send the data
    try {
      const responce = await axios.get(
        'http://localhost:8080/convertor/convert',
        {
          params: {
            date,
            sourceCurrency,
            targetCurrency,
            amountInSourceCurrency,
          },
        }
      );

      const { amountInTargetCurrency } = responce.data;
      //currencyNames
      const { sourceCurrencyName, targetCurrencyName } = responce.data;
      setsourceCurrencyName(sourceCurrencyName);
      settargetCurrencyName(targetCurrencyName);
      setamountInTargetCurrency(amountInTargetCurrency);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="lg:mx-32 text-5xl font-black flex justify-center items-start  text-black ">
        Currency Converter
      </h1>

      <div className=" mt-5 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={getTheTargetAmount}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium" htmlFor="date">
                Date
              </label>
              <input
                required
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:focus:ring-green-500 dark:focus:border-green-500"
                onChange={(e) => Setdate(e.target.value)}
                type="date"
                name="date"
                id="date"
                placeholder="date.."
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                htmlFor="sourceCurrency"
              >
                Source Currency
              </label>

              <select
                value={sourceCurrency} // Set the selected value
                onChange={(e) => setsourceCurrency(e.target.value)}
                className=" bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:focus:ring-green-500 dark:focus:border-green-500"
                name="sourceCurrency"
                id="sourceCurrency"
              >
                <option value="">Select source currency</option>{' '}
                {/* Default empty option */}
                {Object.keys(currencyNames).map((currency) => (
                  <option className=" p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                htmlFor="targetCurrency"
              >
                Target Currency
              </label>
              <select
                value={targetCurrency} // Set the selected value
                onChange={(e) => settargetCurrency(e.target.value)}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:focus:ring-green-500 dark:focus:border-green-500"
                name="sourceCurrency"
                id="sourceCurrency"
              >
                <option value="">Select target currency</option>{' '}
                {/* Default empty option */}
                {Object.keys(currencyNames).map((currency) => (
                  <option className=" p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="amountInSourceCurrency"
              >
                Amount in source currency
              </label>
              <input
                required
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:focus:ring-green-500 dark:focus:border-green-500"
                onChange={(e) => setamountInSourceCurrency(e.target.value)}
                type="number"
                name="amountInSourceCurrency"
                id="amountInSourceCurrency"
                placeholder="Amount in source currency..."
              />
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Get the target Currency
            </button>
          </form>
        </section>
        <h3 className=" flex items-center justify-start py-5 text-lg">
          {pressed ? (
            <div>
              <span className=" text-xl"> {amountInSourceCurrency}</span>{' '}
              {sourceCurrencyName} is equal to
              <span className=" text-xl font-bold text-black">
                {' '}
                {amountInTargetCurrency.toFixed(2)}
              </span>{' '}
              {targetCurrencyName}
            </div>
          ) : (
            ''
          )}
        </h3>
      </div>
    </div>
  );
}
