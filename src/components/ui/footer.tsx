import { Link } from "react-router-dom";


export function Footer(){

    return (
      <footer className="bg-customColor text-white py-4">
   
   
        <div className="container mx-auto text-center">
          <p className="mb-2">© {new Date().getFullYear()} © All rights reserved to Royal Commission for AlUla, Saudi Arabia</p>
          <div className="flex justify-center space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            {/* <a href="/Contact" className="hover:underline">Contact </a> */}
            <a href="http://linkedin.com/in/lama-jumah-9766ab265" target="_blank" rel="noopener noreferrer" className="hover:underline">Contact</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
} 