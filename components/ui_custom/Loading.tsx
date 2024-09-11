import React from 'react';

interface I_Loading extends React.HTMLAttributes<HTMLOrSVGElement> {

};

export function Loading({ className }: I_Loading) {
  return <svg className={`doing ${className}`} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5487" width="32" height="32"><path d="M540.444 272.782a129.138 129.138 0 1 1 129.138-129.138 129.138 129.138 0 0 1-129.138 129.138z" fill="#2A83C6" p-id="5488"></path><path d="M265.387 375.182a118.044 118.044 0 1 1 117.76-117.76 117.76 117.76 0 0 1-117.76 117.76z" fill="#2C8CCD" p-id="5489"></path><path d="M148.764 641.991A104.107 104.107 0 1 1 252.587 538.17a104.107 104.107 0 0 1-103.823 103.82z" fill="#4299D5" p-id="5490"></path><path d="M265.387 906.24a88.178 88.178 0 1 1 88.177-88.178 88.178 88.178 0 0 1-88.177 88.178z" fill="#58A4DB" p-id="5491"></path><path d="M540.444 1007.218a77.084 77.084 0 1 1 76.8-77.085 77.084 77.084 0 0 1-76.8 77.085z" fill="#6EB1E2" p-id="5492"></path><path d="M818.916 877.227a62.293 62.293 0 1 1 62.862-62.294 62.293 62.293 0 0 1-62.294 62.294z" fill="#84BDE7" p-id="5493"></path><path d="M933.262 589.653a51.2 51.2 0 1 1 50.916-51.2 51.2 51.2 0 0 1-50.916 51.2z" fill="#9BCAED" p-id="5494"></path><path d="M779.378 261.12a39.822 39.822 0 1 0 39.538-39.538 39.822 39.822 0 0 0-39.538 39.538z" fill="#B3D7F2" p-id="5495"></path></svg>
}