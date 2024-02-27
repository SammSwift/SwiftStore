import { Footer } from "flowbite-react";
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function FooterCard() {
  return (
    <Footer container className="bg-gray-100 mt-10">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="/"
              // src="https://flowbite.com/docs/images/logo.svg"
              // alt="Flowbite Logo"
              name="SwiftShop"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">SwiftStore</Footer.Link>
                <Footer.Link href="#">Stories</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://www.github.com/samyyswift">
                  Github
                </Footer.Link>
                <Footer.Link href="https://www.linkedin.com/in/samyyswift">
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Link to="/">
            <Footer.Copyright by="SwiftStore™" year={2024} />
          </Link>

          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="https://www.linkedin.com/in/samyyswift"
              icon={FaLinkedinIn}
            />
            <Footer.Icon
              href="https://www.github.com/samyyswift"
              icon={FaGithub}
            />
            <Footer.Icon href="#" icon={FaInstagram} />
            <Footer.Icon href="#" icon={FaTwitter} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterCard;
