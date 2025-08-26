export function friendlyAuthMessage(message?: string) {
  if (!message) return "An unknown error occurred. Please try again.";
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials") || m.includes("invalid login")) {
    return "Invalid email or password.";
  }
  if (m.includes("user not found") || m.includes("account not found")) {
    return "No account found for that email.";
  }
  if (m.includes("already registered") || m.includes("user already exists")) {
    return "An account with that email already exists.";
  }
  if (m.includes("password should be at least") || m.includes("password")) {
    return message; // let server message about password pass through
  }
  // fallback: return original message so caller has context
  return message;
}
