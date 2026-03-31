

import React, { useEffect, useState, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Scanner } from '@yudiel/react-qr-scanner';
 
const ScannerPage = () => {
  const [code, setCode] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [submittedData, setSubmittedData] = useState(null);
  const [ticketCode, setTicketCode] = useState(null);
  const [isScanned, setIsScanned] = useState(true);
  const [errType, setErrType] = useState(null);
  // Replaced alert() with a simple verified message state
  const [verifyMsg, setVerifyMsg] = useState('');
 
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["scan", code],
    queryFn: async () => {
      const resp = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/tickets/scan/${code}`,
        { withCredentials: true }
      );
      return resp.data;
    },
    enabled: false,
    retry: false,
  });
 
  const handleSubmit = async () => {
    if (!code.trim()) return;
    const result = await refetch();
    if (result.data) {
      setSubmittedData(result.data);
      setIsVisible(false);
      // Replaced alert() with inline state message
      setVerifyMsg('Scanner code verified!');
    }
  };
 
  const { mutate, data: scanData, error: scanError } = useMutation({
    mutationFn: async () => {
      const resp = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/tickets/scan`,
        {},
        {
          withCredentials: true,
          params: {
            scannerCode: code,
            ticketCode: ticketCode,
          },
        }
      );
      return resp.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error.response?.data);
    },
    onSettled: () => {
      setTimeout(() => {
        setIsScanned(true);
      }, 3000);
    },
  });
 
  // FIX: Only run mutate when ticketCode changes (not when submittedData changes too)
  // This prevents duplicate mutations when submittedData is already set
  useEffect(() => {
    if (submittedData && ticketCode) {
      mutate();
    }
  }, [ticketCode]); // eslint-disable-line react-hooks/exhaustive-deps
 
  if (!isVisible && submittedData) {
    return (
      <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div
          className='flex-col items-center justify-center bg-gray-100 relative'
          style={{ height: "500px", width: "100%", minWidth: "300px", maxWidth: "600px", padding: "10px" }}
        >
          <Scanner
            onScan={(result) => {
              const value = result[0]?.rawValue;
              if (ticketCode === value && isScanned) {
                setErrType('repeatedScan');
                return;
              }
              if (value && isScanned && ticketCode !== value) {
                setTicketCode(value);
                setIsScanned(false);
              }
            }}
            onError={(error) => console.log(error?.message)}
            constraints={{ facingMode: "environment" }}
            videoStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
 
        {/* Inline verified message instead of alert */}
        {verifyMsg && (
          <p className='text-green-600 font-semibold mt-2'>{verifyMsg}</p>
        )}
 
        <div>{code}</div>
        <div
          onClick={() => { setIsVisible(prev => !prev); setSubmittedData(null); }}
          style={{ padding: "20px", background: "red", borderRadius: "20px", cursor: "pointer" }}
        >
          Change Scanner Code
        </div>
 
        {(scanData || scanError) && !isScanned && (
          <PopUp scanData={scanData} scanError={scanError} />
        )}
        {errType === "repeatedScan" && (
          <PopUp errType='repeatedScan' setErrType={setErrType} />
        )}
      </div>
    );
  }
 
  return (
    <div className='h-screen'>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 flex flex-col gap-4">
          <label htmlFor="scan" className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            Enter Scanner Code
          </label>
 
          <input
            id="scan"
            autoFocus
            className="w-full p-3 bg-gray-100 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all"
            placeholder="SCN1234"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isFetching}
          />
 
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
              Error: {error.response?.data?.message || error.message || 'Scan failed'}
            </div>
          )}
 
          <button
            onClick={handleSubmit}
            disabled={isFetching || !code.trim()}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            {isFetching ? (
              <>
                {/* FIX: Replaced ⟳ char with a proper CSS spinner */}
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Scanning...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
 
const PopUp = ({ scanData = "", scanError = "", errType = "", setErrType }) => {
  // FIX: Moved setTimeout into useEffect to prevent multiple timers on every render
  useEffect(() => {
    if (errType) {
      const timer = setTimeout(() => setErrType(""), 2000);
      return () => clearTimeout(timer); // cleanup on unmount
    }
  }, [errType]);
 
  return (
    <div className='w-[100%] h-screen absolute bg-[rgba(0,0,0,0.3)] top-0 fixed flex justify-center items-center'>
      <div className='w-[300px] h-[200px] bg-[rgba(255,255,255,1)] p-4 rounded-lg'>
        {scanError && (
          <>
            <h2 className='text-xl font-bold text-red-600 mb-4'>✗ Ticket Code Invalid</h2>
            <p className='text-gray-700'>{scanError?.response?.data.message}</p>
          </>
        )}
        {scanData && (
          <>
            <h2 className='text-xl font-bold text-green-600 mb-4'>✓ Ticket Code Valid</h2>
            <p className='text-gray-700'>Ticket scanned successfully</p>
          </>
        )}
        {errType === "repeatedScan" && (
          <>
            <h2 className='text-xl font-bold text-red-600 mb-4'>✗ Repeated Scan</h2>
            <p className='text-gray-700'>This is a repeated scan which is not allowed</p>
          </>
        )}
      </div>
    </div>
  );
};
 
export default ScannerPage;