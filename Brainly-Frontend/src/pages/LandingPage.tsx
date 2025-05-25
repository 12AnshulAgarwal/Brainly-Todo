import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Logo } from "../icons/Logo";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Logo />
            <span className="text-2xl font-bold text-gray-900">Brainly</span>
          </div>
          <div className="space-x-4 flex">
            <Button
              onClick={() => navigate("/signin")}
              variant="secondary"
              text="Sign In"
              size="sm"
            />
            <Button
              onClick={() => navigate("/signup")}
              variant="primary"
              text="Sign Up"
              size="sm"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Second Brain for
            <span className="text-purple-600"> Digital Content</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Save, organize, and rediscover your favorite YouTube videos and
            Twitter posts. Never lose track of valuable content again.
          </p>

          <div className="space-x-4 mb-16 flex justify-center">
            <Button
              onClick={() => navigate("/signup")}
              variant="primary"
              text="Get Started Free"
              size="lg"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <YoutubeIcon />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              YouTube Videos
            </h3>
            <p className="text-gray-600">
              Save YouTube videos with embedded previews. Watch directly from
              your collection.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TwitterIcon />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Twitter Posts
            </h3>
            <p className="text-gray-600">
              Bookmark important tweets and threads. Keep valuable insights at
              your fingertips.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Logo />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Smart Organization
            </h3>
            <p className="text-gray-600">
              Filter and organize your content by platform. Find what you need
              instantly.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to organize your digital life?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who trust Brainly to manage their content.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={() => navigate("/signup")}
              variant="primary"
              text="Start Building Your Second Brain"
              size="lg"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Logo />
              <span className="text-lg font-semibold text-gray-900">
                Brainly
              </span>
            </div>
            <div className="text-sm text-gray-500">
              ©️ 2024 Brainly. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}