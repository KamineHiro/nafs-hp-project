import React from 'react';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 pt-20">
      <h1 className="text-3xl font-bold mb-8">お問い合わせ</h1>
      <form className="max-w-2xl mx-auto">
        <div className="mb-6">
          <label className="block mb-2" htmlFor="name">お名前</label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2" htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2" htmlFor="message">お問い合わせ内容</label>
          <textarea
            id="message"
            className="w-full px-4 py-2 border rounded h-32"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition-colors"
        >
          送信する
        </button>
      </form>
    </div>
  );
} 