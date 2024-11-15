export const SQL_STATEMENTS = {
  // Email Table: Basic email info without body
  // Inbox Table: Stores email body and links to the emailId
  // EmailAddress Table: Store email addresses and link them to Email
  CREATE_TABLES: `
    CREATE TABLE IF NOT EXISTS Email (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT,
        createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
        expiresAt DATETIME
    );

    CREATE TABLE IF NOT EXISTS Inbox (
        id TEXT PRIMARY KEY,
        address TEXT,
        type TEXT, -- Can be 'to', 'cc', 'bcc'
        textContent TEXT,
        htmlContent TEXT,
        createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),

        emailId INTEGER,
        FOREIGN KEY (emailId) REFERENCES Email(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS EmailAddress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT, -- Can be 'from', 'to', 'cc', 'bcc'
        address TEXT,

        emailId INTEGER,
        FOREIGN KEY (emailId) REFERENCES Email(id) ON DELETE CASCADE
    );
    `,

  // PRAGMA settings for performance optimization
  PRAGMA: `
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    `,

  // Insert statement for Email
  insertEmail: `
    INSERT INTO Email 
    (subject, expiresAt)
    VALUES (?, ?)
    `,

  // Insert statement for Inbox
  insertInbox: `
    INSERT INTO Inbox 
    (id, emailId, address, type, textContent, htmlContent) 
    VALUES (?, ?, ?, ?, ?, ?)
    `,

  // Insert statement for EmailAddress
  insertEmailAddress: `
    INSERT INTO EmailAddress 
    (emailId, type, address)
    VALUES (?, ?, ?)
    `,

  // For fetching emails for a specific address
  getEmailsForAddress: `
    SELECT 
      Inbox.id, 
      Email.subject, 
      Email.CreatedAt,
      (SELECT EmailAddress.address FROM EmailAddress WHERE EmailAddress.emailId = Email.id AND EmailAddress.type = 'from') as fromAddress,
      GROUP_CONCAT(EmailAddress.address, ', ') as toAddress
    FROM Email
    JOIN Inbox ON Email.id = Inbox.emailId
    LEFT JOIN EmailAddress ON Email.id = EmailAddress.emailId AND EmailAddress.type = 'to'
    WHERE Inbox.address = ?
    GROUP BY Email.id
  `,

  // For fetching email by inbox ID (to get the full body)
  getInboxById: `
    SELECT 
      Inbox.id,
      Inbox.textContent, 
      Inbox.htmlContent, 
      Email.subject, 
      Email.expiresAt,
      Email.createdAt,
      (SELECT EmailAddress.address FROM EmailAddress WHERE EmailAddress.emailId = Email.id AND EmailAddress.type = 'from') as fromAddress,
      GROUP_CONCAT(EmailAddress.address, ', ') as toAddress
    FROM Inbox
    JOIN Email ON Inbox.emailId = Email.id
    LEFT JOIN EmailAddress ON Email.id = EmailAddress.emailId AND EmailAddress.type = 'to'
    WHERE Inbox.id = ?
    GROUP BY Email.id
  `,

  // To delete expired entries
  deleteExpiredEntries: `
    DELETE FROM Inbox
    WHERE createdAt < strftime('%s', 'now', '-3 days') * 1000
    `,
};
