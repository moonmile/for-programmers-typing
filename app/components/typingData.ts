// プログラミング用語・概念
export const programmingTerms = [
  // 基本的なプログラミング概念
  'algorithm', 'data structure', 'recursion', 'iteration', 'polymorphism',
  'encapsulation', 'inheritance', 'abstraction', 'interface', 'implementation',
  'compilation', 'interpretation', 'debugging', 'refactoring', 'optimization',
  
  // Web開発
  'frontend', 'backend', 'fullstack', 'responsive design', 'single page application',
  'progressive web app', 'server side rendering', 'client side rendering',
  'microservices', 'monolithic architecture', 'containerization', 'orchestration',
  
  // データベース
  'relational database', 'nosql database', 'normalization', 'denormalization',
  'indexing', 'transaction', 'acid properties', 'consistency', 'availability',
  'partition tolerance', 'replication', 'sharding',
  
  // セキュリティ
  'authentication', 'authorization', 'encryption', 'hashing', 'digital signature',
  'certificate authority', 'secure socket layer', 'transport layer security',
  'cross site scripting', 'sql injection', 'cross site request forgery',
  
  // 開発手法
  'agile development', 'scrum methodology', 'kanban', 'continuous integration',
  'continuous deployment', 'test driven development', 'behavior driven development',
  'domain driven design', 'version control system', 'code review'
]

// 省略形とフルスペル
export const abbreviations = [
  { short: 'API', full: 'Application Programming Interface' },
  { short: 'CSS', full: 'Cascading Style Sheets' },
  { short: 'HTML', full: 'HyperText Markup Language' },
  { short: 'HTTP', full: 'HyperText Transfer Protocol' },
  { short: 'HTTPS', full: 'HyperText Transfer Protocol Secure' },
  { short: 'URL', full: 'Uniform Resource Locator' },
  { short: 'URI', full: 'Uniform Resource Identifier' },
  { short: 'JSON', full: 'JavaScript Object Notation' },
  { short: 'XML', full: 'eXtensible Markup Language' },
  { short: 'SQL', full: 'Structured Query Language' },
  { short: 'CRUD', full: 'Create Read Update Delete' },
  { short: 'REST', full: 'Representational State Transfer' },
  { short: 'SOAP', full: 'Simple Object Access Protocol' },
  { short: 'JWT', full: 'JSON Web Token' },
  { short: 'DOM', full: 'Document Object Model' },
  { short: 'BOM', full: 'Browser Object Model' },
  { short: 'SPA', full: 'Single Page Application' },
  { short: 'PWA', full: 'Progressive Web Application' },
  { short: 'SSR', full: 'Server Side Rendering' },
  { short: 'CSR', full: 'Client Side Rendering' },
  { short: 'CDN', full: 'Content Delivery Network' },
  { short: 'DNS', full: 'Domain Name System' },
  { short: 'TCP', full: 'Transmission Control Protocol' },
  { short: 'UDP', full: 'User Datagram Protocol' },
  { short: 'IP', full: 'Internet Protocol' },
  { short: 'SSH', full: 'Secure Shell' },
  { short: 'FTP', full: 'File Transfer Protocol' },
  { short: 'SFTP', full: 'SSH File Transfer Protocol' },
  { short: 'MVC', full: 'Model View Controller' },
  { short: 'MVP', full: 'Model View Presenter' },
  { short: 'MVVM', full: 'Model View ViewModel' },
  { short: 'OOP', full: 'Object Oriented Programming' },
  { short: 'FP', full: 'Functional Programming' },
  { short: 'TDD', full: 'Test Driven Development' },
  { short: 'BDD', full: 'Behavior Driven Development' },
  { short: 'DDD', full: 'Domain Driven Design' },
  { short: 'CI', full: 'Continuous Integration' },
  { short: 'CD', full: 'Continuous Deployment' },
  { short: 'AWS', full: 'Amazon Web Services' },
  { short: 'GCP', full: 'Google Cloud Platform' },
  { short: 'IDE', full: 'Integrated Development Environment' },
  { short: 'SDK', full: 'Software Development Kit' },
  { short: 'CLI', full: 'Command Line Interface' },
  { short: 'GUI', full: 'Graphical User Interface' },
  { short: 'UI', full: 'User Interface' },
  { short: 'UX', full: 'User Experience' }
]

// プログラミングコード片
export const codeSnippets = [
  // JavaScript/TypeScript
  'const greeting = "Hello, World!";',
  'function calculateSum(a, b) { return a + b; }',
  'const users = await fetch("/api/users");',
  'export default function Component() {}',
  'import React from "react";',
  'interface User { id: number; name: string; }',
  'type Status = "loading" | "success" | "error";',
  'const [count, setCount] = useState(0);',
  'useEffect(() => { console.log("mounted"); }, []);',
  'try { await asyncFunction(); } catch (error) {}',
  
  // Python
  'def fibonacci(n): return n if n <= 1 else fibonacci(n-1) + fibonacci(n-2)',
  'class Person: def __init__(self, name): self.name = name',
  'import pandas as pd',
  'from typing import List, Dict, Optional',
  'with open("file.txt", "r") as f: content = f.read()',
  'lambda x: x ** 2',
  'list_comp = [x for x in range(10) if x % 2 == 0]',
  
  // Java
  'public class Main { public static void main(String[] args) {} }',
  'private final String name;',
  'List<String> items = new ArrayList<>();',
  'if (condition) { System.out.println("true"); }',
  
  // SQL
  'SELECT * FROM users WHERE age > 18;',
  'INSERT INTO products (name, price) VALUES ("laptop", 999.99);',
  'UPDATE users SET status = "active" WHERE id = 1;',
  'CREATE TABLE orders (id INT PRIMARY KEY, user_id INT);',
  'JOIN customers ON orders.customer_id = customers.id',
  
  // Git コマンド
  'git add .',
  'git commit -m "Initial commit"',
  'git push origin main',
  'git pull --rebase',
  'git checkout -b feature/new-feature',
  'git merge develop',
  'git rebase -i HEAD~3',
  
  // Docker
  'FROM node:18-alpine',
  'RUN npm install',
  'COPY . .',
  'EXPOSE 3000',
  'docker build -t myapp .',
  'docker run -p 3000:3000 myapp',
  
  // Linux/Shell
  'chmod +x script.sh',
  'grep -r "pattern" .',
  'find . -name "*.js"',
  'ps aux | grep node',
  'curl -X POST https://api.example.com/data',
  'npm install --save-dev typescript',
  'yarn add react react-dom'
]

// ランダムな文章を生成する関数
let lastAbbreviation: { short: string; full: string } | null = null
let shouldShowFull = false

export function getRandomText(): string {
  const textTypes = ['term', 'abbreviation', 'code']
  const randomType = textTypes[Math.floor(Math.random() * textTypes.length)]
  
  switch (randomType) {
    case 'term':
      lastAbbreviation = null
      shouldShowFull = false
      return programmingTerms[Math.floor(Math.random() * programmingTerms.length)]
    
    case 'abbreviation':
      // 前回abbreviationのshortを出していた場合は、そのfullを出す
      if (lastAbbreviation && shouldShowFull) {
        const result = lastAbbreviation.full
        lastAbbreviation = null
        shouldShowFull = false
        return result
      }
      
      // 新しいabbreviationのshortを出す
      const abbr = abbreviations[Math.floor(Math.random() * abbreviations.length)]
      lastAbbreviation = abbr
      shouldShowFull = true
      return abbr.short
    
    case 'code':
      lastAbbreviation = null
      shouldShowFull = false
      return codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
    
    default:
      return programmingTerms[0]
  }
}
