import { BsFacebook, BsDiscord, BsGithub } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";

export default function Footer() {
  return (
    <div className="w-full mx-auto py-16 px-8 grid lg:grid-cols-3 gap-8 text-gray-300 bg-black/80">
      <div>
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">Promtcher</h1>
        <h3 className="py-4">©2023</h3>

        <div className="flex justify-between md:w-[75%] my-6">
          <BsFacebook size={30} className="cursor-pointer" />
          <BsDiscord size={30} className="cursor-pointer" />
          <BsGithub size={30} className="cursor-pointer" />
          <AiOutlineTwitter size={30} className="cursor-pointer" />
        </div>
      </div>

      <div className="lg:col-span-2 flex justify-between mt-6">
        <div>
          <h6 className="font-medium text-gray-400">Solutions</h6>
          <ul>
            <li className="py-2 text-sm">Analytics</li>
            <li className="py-2 text-sm">Marketing</li>
            <li className="py-2 text-sm">Commerce</li>
            <li className="py-2 text-sm">Insights</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Support</h6>
          <ul>
            <li className="py-2 text-sm">Pricing</li>
            <li className="py-2 text-sm">Documentation</li>
            <li className="py-2 text-sm">Guides</li>
            <li className="py-2 text-sm">API Status</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Company</h6>
          <ul>
            <li className="py-2 text-sm">About</li>
            <li className="py-2 text-sm">Blog</li>
            <li className="py-2 text-sm">Jobs</li>
            <li className="py-2 text-sm">Press</li>
            <li className="py-2 text-sm">Careers</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Legal</h6>
          <ul>
            <li className="py-2 text-sm">Claim</li>
            <li className="py-2 text-sm">Policy</li>
            <li className="py-2 text-sm">Terms</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
