export class JSONFormatter {
  static escapeJSON(str) {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\b/g, '\\b')
      .replace(/\f/g, '\\f')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
  }

  static unescapeJSON(str) {
    return str
      .replace(/\\b/g, '\b')
      .replace(/\\f/g, '\f')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }

  static formatAIReview(aiReview) {
    try {
      if (typeof aiReview === 'string') {
        const unescaped = this.unescapeJSON(aiReview);
        return JSON.parse(unescaped);
      }
      return aiReview;
    } catch (error) {
      console.error('Error formatting AI review:', error);
      return null;
    }
  }
}
