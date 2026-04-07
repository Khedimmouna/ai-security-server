import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import type { Player, Message } from "../App";

interface TeamChatProps {
  currentPlayer: Player;
  teamPlayers: Player[];
  messages: Message[];
  onSendMessage: (text: string) => void;
}

const QUICK_MESSAGES = [
  "👋 Bonjour !",
  "⚔️ À l'attaque !",
  "🛡️ Je défends !",
  "🎯 Bien joué !",
  "👀 Attention !",
];

export function TeamChat({
  currentPlayer,
  teamPlayers,
  messages,
  onSendMessage,
}: TeamChatProps) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll vers le bas quand un nouveau message arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const content = (text || newMessage).trim();
    if (!content) return;
    onSendMessage(content);
    if (!text) setNewMessage("");
  };

  const teamColor = currentPlayer.team === "red" ? "red" : "blue";

  return (
    <div className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-700">
        <Users
          className={`w-5 h-5 ${teamColor === "red" ? "text-red-400" : "text-blue-400"}`}
        />
        <h3 className="text-white font-semibold">
          Chat Équipe {teamColor === "red" ? "Rouge" : "Bleue"}
        </h3>
        <span className="text-xs text-slate-400 ml-auto">
          {teamPlayers.length} membre{teamPlayers.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
        <AnimatePresence>
          {messages.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              Aucun message pour le moment. Dites bonjour ! 👋
            </div>
          )}
          {messages.map((message) => {
            const isOwn = message.playerId === currentPlayer.id;
            const isSystem = message.playerId === "system";

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`${isOwn ? "ml-8" : isSystem ? "mx-4" : "mr-8"}`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    isSystem
                      ? "bg-purple-500/20 border border-purple-500/40 text-center"
                      : isOwn
                        ? teamColor === "red"
                          ? "bg-red-500/20 border border-red-500/40"
                          : "bg-blue-500/20 border border-blue-500/40"
                        : "bg-slate-700/60 border border-slate-600"
                  }`}
                >
                  {!isSystem && (
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-sm font-semibold ${
                          isOwn
                            ? teamColor === "red"
                              ? "text-red-300"
                              : "text-blue-300"
                            : "text-slate-200"
                        }`}
                      >
                        {message.playerName}
                        {isOwn && " (Vous)"}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(message.timestamp).toLocaleTimeString(
                          "fr-FR",
                        )}
                      </span>
                    </div>
                  )}
                  {/* ✅ Couleur du texte corrigée — blanc visible */}
                  <p
                    className={`text-sm ${isSystem ? "text-purple-200" : "text-white"}`}
                  >
                    {message.content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      {/* Messages rapides */}
      <div className="flex flex-wrap gap-2 mb-3">
        {QUICK_MESSAGES.map((msg) => (
          <button
            key={msg}
            onClick={() => sendMessage(msg)}
            className="text-xs px-3 py-1.5 bg-slate-700/60 hover:bg-slate-600/80 border border-slate-600 text-slate-200 rounded-full transition-all hover:border-slate-500"
          >
            {msg}
          </button>
        ))}
      </div>
      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Tapez votre message..."
          className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-400"
        />
        <Button
          onClick={() => sendMessage()}
          disabled={!newMessage.trim()}
          className={`${teamColor === "red" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
