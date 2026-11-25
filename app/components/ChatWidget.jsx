'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { assistantReplies } from '@/lib/content';

const suggestions = ['Pricing', 'Security', 'Web and app services', 'Careers'];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const replyTimer = useRef(null);

  const push = (message) => setMessages((current) => [...current, message]);

  const openChat = () => {
    setOpen(true);
    if (!messages.length) {
      push({
        from: 'bot',
        text: 'Hi, I’m the Bryn assistant. What can I help you find?',
      });
    }
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const closeChat = () => {
    setOpen(false);
    buttonRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    const onOpen = () => openChat();
    window.addEventListener('bryn:chat', onOpen);
    return () => window.removeEventListener('bryn:chat', onOpen);
  }, [messages.length]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && open) closeChat();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => () => window.clearTimeout(replyTimer.current), []);

  const ask = (question) => {
    const text = question.trim();
    if (!text) return;
    push({ from: 'user', text });
    setValue('');
    window.clearTimeout(replyTimer.current);
    replyTimer.current = window.setTimeout(() => {
      const match = assistantReplies.find((reply) => reply.match.test(text));
      push(
        match
          ? { from: 'bot', text: match.reply, link: match.link }
          : {
              from: 'bot',
              text: 'I’m not sure about that one. The FAQs may help, or our team can answer directly.',
              link: ['/contact', 'Contact us'],
            },
      );
    }, 600);
  };

  const submit = (event) => {
    event.preventDefault();
    ask(value);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="chat-button"
        aria-label={open ? 'Close chat' : 'Chat with Bryn'}
        aria-expanded={open}
        aria-controls="chat-panel"
        onClick={() => (open ? closeChat() : openChat())}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16v11H9l-5 4z" />
        </svg>
      </button>

      {open ? (
        <div
          ref={panelRef}
          id="chat-panel"
          className="chat-panel"
          role="dialog"
          aria-label="Bryn assistant"
        >
          <div className="chat-head">
            <b>Bryn assistant</b>
            <span className="status-ok">Assistant</span>
            <button type="button" aria-label="Close chat" onClick={closeChat}>
              ×
            </button>
          </div>
          <div className="chat-messages" ref={messagesRef} aria-live="polite">
            {messages.map((message, index) => (
              <div
                className={`chat-message ${message.from === 'bot' ? 'is-bot' : 'is-user'}`}
                key={`${message.from}-${index}`}
              >
                {message.text}
                {message.link ? <Link href={message.link[0]}>{message.link[1]} →</Link> : null}
              </div>
            ))}
          </div>
          {messages.length <= 1 ? (
            <div className="chat-suggestions">
              {suggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => ask(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}
          <form className="chat-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="chat-message">
              Message
            </label>
            <input
              ref={inputRef}
              id="chat-message"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Ask about pricing, security, services"
              autoComplete="off"
            />
            <button type="submit" aria-label="Send">
              →
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
