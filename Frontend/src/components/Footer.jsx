import {
    Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-[#121316] text-white py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h2 className="text-3xl font-semibold text-[#FF5F5F] mb-4">
              CodingMeet
            </h2>
            <p className="text-base mb-4">
              Learn & grow with real-world coding projects. 100% free resources,
              practical learning, and a supportive community.
            </p>
            <p className="text-sm text-gray-400">Founded by Sanjay Choudhary</p>
          </div>

          {/* Middle Column: Contact */}
          <div>
            <h3 className="text-xl font-semibold text-[#FF5F5F] mb-4">
              Contact
            </h3>
            <div className="flex items-center mb-3">
              <Mail className="w-6 h-6 text-yellow-400 mr-3" />
              <span>codingmeet18@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 text-yellow-400 mr-3" />
              <span>+91 7568045830</span>
            </div>
          </div>

          {/* Right Column: Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold text-[#FF5F5F] mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-600"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>&copy; 2025 CodingMeet. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
