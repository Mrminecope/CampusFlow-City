import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  FileText, 
  GraduationCap, 
  Compass, 
  HelpCircle, 
  Lightbulb, 
  CheckCircle2, 
  RefreshCw,
  AlertCircle,
  Award,
  Calendar,
  Building2,
  Briefcase
} from 'lucide-react';
import { UserProfile } from '../../types';
import { sendAdvisorChat } from '../../lib/geminiClient';

interface AIAdvisorViewProps {
  user: UserProfile;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendations?: string[];
  isError?: boolean;
}

export const AIAdvisorView: React.FC<AIAdvisorViewProps> = ({ user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: `Hello ${user.name}! I am your CampusFlow AI Academic Counselor powered by Gemini 3.8 Flash. Based on your CampusFlow Profile Data (GPA: ${user.gpa ? `${user.gpa}/4.0` : 'Not provided'}, SAT: ${user.satScore ?? 'Not provided'}, IELTS: ${user.ieltsScore ?? 'Not provided'}, Career: ${user.careerGoal || 'Not provided'}), I can provide personalized guidance on:\n\n• Target Universities & Acceptance Chances\n• Undergraduate & Master's Degree Programs\n• Merit & Need-Based Scholarships\n• Upcoming Deadlines & Priority Action Items\n• Application Essays & Document Requirements\n• Career Trajectories & Industry Outlooks\n\nWhat would you like to explore today?`,
      timestamp: '10:00 AM',
      recommendations: [
        'Evaluate my admission odds for University of Toronto & NUS',
        'Which scholarships fit my academic profile and budget?',
        'What are my urgent application deadlines and missing documents?',
        'What high-paying careers can I pursue in AI & Systems engineering?'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastFailedQuery, setLastFailedQuery] = useState<string | null>(null);

  const quickPromptTopics = [
    { label: 'Universities', prompt: `Which universities best match my profile (${user.gpa ? `GPA: ${user.gpa}` : 'academic background'})?`, icon: <Building2 className="w-3 h-3 text-blue-600" /> },
    { label: 'Courses', prompt: 'What specific courses and prerequisites do I need for Computer Science at top institutions?', icon: <GraduationCap className="w-3 h-3 text-indigo-600" /> },
    { label: 'Scholarships', prompt: 'Show me full-tuition scholarships for international students with my profile.', icon: <Award className="w-3 h-3 text-amber-600" /> },
    { label: 'Deadlines', prompt: 'What are my top critical upcoming application deadlines?', icon: <Calendar className="w-3 h-3 text-red-600" /> },
    { label: 'Careers', prompt: `How do I position my profile for a career in ${user.careerGoal || 'technology and engineering'}?`, icon: <Briefcase className="w-3 h-3 text-emerald-600" /> },
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);
    setLastFailedQuery(null);

    // Build chat history for Gemini multi-turn conversation
    const history = messages.slice(1).map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('model' as const),
      text: m.text,
    }));

    try {
      const response = await sendAdvisorChat(
        user,
        history,
        query,
        {
          careerGoal: user.careerGoal,
          budget: user.budget,
          preferredLocation: user.preferredLocation,
          targetCountries: user.targetCountries,
        }
      );

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendations: response.recommendations,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('AI Advisor error:', err);
      setLastFailedQuery(query);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `I encountered an issue retrieving counseling data from Gemini (${err?.message || 'Connection timeout'}). Please verify your internet connection or click retry below.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedQuery) {
      handleSend(lastFailedQuery);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h1 className="text-xl font-bold text-slate-900">FlowAI Academic Advisor</h1>
            <span className="px-2 py-0.5 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              AI-generated guidance • Gemini 3.8 Flash
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              Based on CampusFlow Prototype Data
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Real Gemini-powered counselor advising on universities, courses, scholarships, deadlines, applications, and careers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setMessages([messages[0]]);
            setLastFailedQuery(null);
          }}
          className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Chat</span>
        </button>
      </div>

      {/* Quick Topic Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Quick Topics:
        </span>
        {quickPromptTopics.map((topic, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(topic.prompt)}
            className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 shadow-2xs"
          >
            {topic.icon}
            <span>{topic.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col h-[580px] overflow-hidden">
        {/* Messages List */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className={`w-7 h-7 rounded-lg text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${
                  msg.isError ? 'bg-red-600' : 'bg-[#1d4ed8]'
                }`}>
                  {msg.isError ? <AlertCircle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-xl p-4 ${
                  msg.sender === 'user'
                    ? 'bg-[#1d4ed8] text-white font-medium rounded-tr-none shadow-2xs'
                    : msg.isError
                    ? 'bg-red-50 text-red-900 border border-red-200 rounded-tl-none space-y-2'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-none space-y-3'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

                {/* Error Retry Button */}
                {msg.isError && lastFailedQuery && (
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="px-2.5 py-1 text-xs font-bold text-red-700 bg-white border border-red-300 rounded hover:bg-red-50 flex items-center gap-1 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Retry Inquiry</span>
                    </button>
                  </div>
                )}

                {/* Suggested Follow-up Recommendations Chips */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="pt-2.5 border-t border-slate-200/70 space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-amber-500" />
                      <span>Suggested Follow-up Questions</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.recommendations.map((rec, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSend(rec)}
                          className="px-2.5 py-1 text-[11px] font-medium bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 rounded-md transition-colors text-left shadow-2xs"
                        >
                          {rec}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`text-[9px] mt-1 ${msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400 flex items-center justify-between'}`}>
                  {msg.sender === 'assistant' && (
                    <span>AI-generated guidance • Based on CampusFlow Prototype Data</span>
                  )}
                  <span>{msg.timestamp}</span>
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <div className="w-7 h-7 rounded-lg bg-[#1d4ed8] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 px-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-slate-600 font-medium ml-1">
                  Gemini is evaluating your profile credentials...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-50/70 border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about universities, courses, scholarships, deadlines, or careers..."
              className="flex-1 px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-slate-800"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4 py-2.5 bg-[#1d4ed8] hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
