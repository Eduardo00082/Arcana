type TokenType = "keyword" | "string" | "number" | "comment" | "function" | "variable" | "type" | "operator" | "default"

const tokenColors: Record<TokenType, string> = {
  keyword: "#c678dd",
  string: "#98c379",
  number: "#d19a66",
  comment: "#5c6370",
  function: "#61afef",
  variable: "#e06c75",
  type: "#e5c07b",
  operator: "#56b6c2",
  default: "#abb2bf",
}

const keywords: Record<string, string[]> = {
  javascript: [
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "for",
    "while",
    "class",
    "extends",
    "import",
    "export",
    "from",
    "default",
    "async",
    "await",
    "try",
    "catch",
    "throw",
    "new",
    "this",
    "super",
    "null",
    "undefined",
    "true",
    "false",
    "typeof",
    "instanceof",
  ],
  typescript: [
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "for",
    "while",
    "class",
    "extends",
    "import",
    "export",
    "from",
    "default",
    "async",
    "await",
    "try",
    "catch",
    "throw",
    "new",
    "this",
    "super",
    "null",
    "undefined",
    "true",
    "false",
    "typeof",
    "instanceof",
    "interface",
    "type",
    "as",
    "implements",
    "private",
    "public",
    "protected",
    "readonly",
    "enum",
    "namespace",
  ],
  tsx: [
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "for",
    "while",
    "class",
    "extends",
    "import",
    "export",
    "from",
    "default",
    "async",
    "await",
    "try",
    "catch",
    "throw",
    "new",
    "this",
    "super",
    "null",
    "undefined",
    "true",
    "false",
    "typeof",
    "instanceof",
    "interface",
    "type",
    "as",
    "implements",
    "private",
    "public",
    "protected",
    "readonly",
  ],
  python: [
    "def",
    "class",
    "if",
    "elif",
    "else",
    "for",
    "while",
    "return",
    "import",
    "from",
    "as",
    "try",
    "except",
    "finally",
    "raise",
    "with",
    "lambda",
    "yield",
    "global",
    "nonlocal",
    "pass",
    "break",
    "continue",
    "True",
    "False",
    "None",
    "and",
    "or",
    "not",
    "in",
    "is",
    "self",
  ],
  sql: [
    "SELECT",
    "FROM",
    "WHERE",
    "INSERT",
    "UPDATE",
    "DELETE",
    "CREATE",
    "DROP",
    "ALTER",
    "TABLE",
    "INDEX",
    "VIEW",
    "JOIN",
    "INNER",
    "LEFT",
    "RIGHT",
    "OUTER",
    "ON",
    "AND",
    "OR",
    "NOT",
    "NULL",
    "PRIMARY",
    "KEY",
    "FOREIGN",
    "REFERENCES",
    "ORDER",
    "BY",
    "GROUP",
    "HAVING",
    "LIMIT",
    "OFFSET",
    "AS",
    "DISTINCT",
    "COUNT",
    "SUM",
    "AVG",
    "MIN",
    "MAX",
    "DESC",
    "ASC",
  ],
  css: [
    "import",
    "from",
    "url",
    "var",
    "calc",
    "rgb",
    "rgba",
    "hsl",
    "hsla",
    "linear-gradient",
    "radial-gradient",
    "none",
    "auto",
    "inherit",
    "initial",
    "unset",
  ],
  yaml: ["true", "false", "null", "yes", "no", "on", "off"],
  bash: [
    "if",
    "then",
    "else",
    "fi",
    "for",
    "while",
    "do",
    "done",
    "case",
    "esac",
    "function",
    "return",
    "exit",
    "echo",
    "export",
    "source",
    "local",
  ],
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

export function highlightCode(code: string, language: string): string {
  const lines = code.split("\n")
  const langKeywords = keywords[language] || keywords.javascript || []

  return lines
    .map((line) => {
      let result = ""
      let i = 0

      while (i < line.length) {
        // Comments
        if (line.slice(i, i + 2) === "//" || line[i] === "#") {
          const comment = escapeHtml(line.slice(i))
          result += `<span style="color: ${tokenColors.comment}; font-style: italic">${comment}</span>`
          break
        }

        // Multi-line comment start
        if (line.slice(i, i + 2) === "/*") {
          const endIndex = line.indexOf("*/", i + 2)
          if (endIndex !== -1) {
            const comment = escapeHtml(line.slice(i, endIndex + 2))
            result += `<span style="color: ${tokenColors.comment}; font-style: italic">${comment}</span>`
            i = endIndex + 2
            continue
          }
        }

        // Strings
        if (line[i] === '"' || line[i] === "'" || line[i] === "`") {
          const quote = line[i]
          let j = i + 1
          while (j < line.length && (line[j] !== quote || line[j - 1] === "\\")) {
            j++
          }
          const str = escapeHtml(line.slice(i, j + 1))
          result += `<span style="color: ${tokenColors.string}">${str}</span>`
          i = j + 1
          continue
        }

        // Numbers
        if (/\d/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
          let j = i
          while (j < line.length && /[\d.xXa-fA-F]/.test(line[j])) {
            j++
          }
          const num = escapeHtml(line.slice(i, j))
          result += `<span style="color: ${tokenColors.number}">${num}</span>`
          i = j
          continue
        }

        // Words (keywords, functions, variables)
        if (/[a-zA-Z_]/.test(line[i])) {
          let j = i
          while (j < line.length && /[\w]/.test(line[j])) {
            j++
          }
          const word = line.slice(i, j)
          const escapedWord = escapeHtml(word)

          if (langKeywords.includes(word) || langKeywords.includes(word.toUpperCase())) {
            result += `<span style="color: ${tokenColors.keyword}">${escapedWord}</span>`
          } else if (line[j] === "(") {
            result += `<span style="color: ${tokenColors.function}">${escapedWord}</span>`
          } else if (/^[A-Z]/.test(word)) {
            result += `<span style="color: ${tokenColors.type}">${escapedWord}</span>`
          } else {
            result += `<span style="color: ${tokenColors.default}">${escapedWord}</span>`
          }
          i = j
          continue
        }

        // Operators
        if (/[+\-*/%=<>!&|^~?:]/.test(line[i])) {
          result += `<span style="color: ${tokenColors.operator}">${escapeHtml(line[i])}</span>`
          i++
          continue
        }

        // Default
        result += escapeHtml(line[i])
        i++
      }

      return result
    })
    .join("\n")
}
