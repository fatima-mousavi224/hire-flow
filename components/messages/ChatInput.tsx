'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Send, Paperclip, Smile, X, FileText } from 'lucide-react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface ChatInputProps {
  onSendMessage: (text: string, fileUrl?: string, fileType?: 'image' | 'file') => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle emoji selection
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputText((prev) => prev + emojiData.emoji);
  };

  // Handle file selection from computer/phone
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview(file.name);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = async () => {
    if (!inputText.trim() && !selectedFile) return;

    let uploadedUrl = '';
    let uploadedType: 'image' | 'file' | undefined = undefined;

    // Optional: Add file upload logic here (e.g. upload to AWS S3 / Supabase)
    if (selectedFile) {
      uploadedType = selectedFile.type.startsWith('image/') ? 'image' : 'file';
      uploadedUrl = filePreview || ''; // Replace with actual uploaded server URL
    }

    onSendMessage(inputText.trim(), uploadedUrl, uploadedType);

    // Reset input fields
    setInputText('');
    handleClearFile();
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative border-t border-slate-100 bg-white p-4">
      {/* Emoji Picker Popup Container */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4 z-50 shadow-xl rounded-2xl overflow-hidden">
          <EmojiPicker onEmojiClick={handleEmojiClick} width={320} height={400} />
        </div>
      )}

      {/* File Preview Attachment Bar */}
      {selectedFile && (
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-100 p-2 max-w-xs">
          {selectedFile.type.startsWith('image/') ? (
            <Image
              src={filePreview!}
              alt="upload preview"
              width={40}
              height={40}
              unoptimized
              className="h-10 w-10 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-[#5243E0]">
              <FileText className="h-5 w-5" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-800 truncate">{selectedFile.name}</p>
            <p className="text-[10px] text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB</p>
          </div>
          <button onClick={handleClearFile} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Input Action Bar */}
      <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-2 border border-slate-200/60 focus-within:border-indigo-300">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt"
        />

        {/* File Attachment Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Paperclip className="h-5 w-5" />
        </button>

        {/* Emoji Toggle Button */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <Smile className="h-5 w-5" />
        </button>

        <input
          type="text"
          placeholder="Write a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent px-2 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
        />

        <button
          onClick={handleSend}
          disabled={!inputText.trim() && !selectedFile}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5243E0] text-white transition-opacity hover:opacity-90 disabled:opacity-40 cursor-pointer"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}