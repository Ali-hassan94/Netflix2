export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Help Text */}
        <p className="mb-8 text-sm">Questions? Contact us.</p>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div className="flex flex-col gap-3">
            <a href="#" className="hover:underline">
              FAQ
            </a>
            <a href="#" className="hover:underline">
              Investor Relations
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Speed Test
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <a href="#" className="hover:underline">
              Help Center
            </a>
            <a href="#" className="hover:underline">
              Jobs
            </a>
            <a href="#" className="hover:underline">
              Cookie Preferences
            </a>
            <a href="#" className="hover:underline">
              Legal Notices
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <a href="#" className="hover:underline">
              Account
            </a>
            <a href="#" className="hover:underline">
              Ways to Watch
            </a>
            <a href="#" className="hover:underline">
              Corporate Information
            </a>
            <a href="#" className="hover:underline">
              Only on Netflix
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <a href="#" className="hover:underline">
              Media Center
            </a>
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </div>
        </div>

        {/* Language Select */}
        <div className="mt-10">
          <select className="bg-black border border-gray-700 px-4 py-2 text-sm">
            <option>English</option>
            <option>Urdu</option>
          </select>
        </div>

        {/* Bottom Text */}
        <p className="mt-8 text-xs text-gray-500">
          © 2026 Netflix Clone — Streaming Platform
        </p>
      </div>
    </footer>
  );
}
