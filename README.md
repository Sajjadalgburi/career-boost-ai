# Career Boost AI 🚀

Career Boost AI is a modern web application that leverages artificial intelligence to help users improve their resumes and boost their career prospects. Built with Next.js and powered by advanced AI models, this tool provides intelligent resume analysis and enhancement suggestions.

## Features ✨

- **AI-Powered Resume Analysis**: Upload your resume and receive detailed feedback on its strengths and weaknesses
- **PDF Text Extraction**: Seamlessly extract and process text from PDF resumes
- **LaTeX Resume Generation**: Generate professionally formatted LaTeX resumes
- **Real-time Improvements**: Get instant suggestions for improving your resume content
- **Job Market Insights**: Receive personalized job recommendations based on your skills and experience

## Tech Stack 🛠️

- **Framework**: Next.js 15.1
- **Language**: TypeScript
- **AI Integration**: OpenAI SDK, Together AI
- **PDF Processing**: pdf.js
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **State Management**: React Hooks

## Getting Started 🚀

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/career-boost-ai.git
cd career-boost-ai
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the following variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
OPENAI_API_KEY=your_openai_api_key
TOGETHER_API_KEY=your_together_api_key
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## Project Structure 📁

```
career-boost-ai/
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   └── page.tsx         # Main page component
├── components/          # React components
├── helpers/            # Utility functions
├── public/             # Static assets
└── styles/            # Global styles
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

If you have any questions or run into issues, please open an issue in the GitHub repository.

---

Built with ❤️ using Next.js and AI
