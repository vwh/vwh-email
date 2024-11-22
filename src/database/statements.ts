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
        textContent TEXT,
        htmlContent TEXT,
        createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),

        emailId INTEGER,
        FOREIGN KEY (emailId) REFERENCES Email(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS EmailAddress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT, -- Can be 'from', 'to'
        address TEXT,

        emailId INTEGER,
        FOREIGN KEY (emailId) REFERENCES Email(id) ON DELETE CASCADE
    );
    `,

  CREATE_INDEX: `
    CREATE INDEX IF NOT EXISTS idx_email_id ON EmailAddress(emailId);
    CREATE INDEX IF NOT EXISTS idx_inbox_address ON Inbox(address);
  `,

  PRAGMA: `
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
  `,

  INSERT_EMAIL: `
    INSERT INTO Email (subject, expiresAt) 
    VALUES (?, ?)
  `,

  INSERT_INBOX: `
    INSERT INTO Inbox (id, emailId, address, textContent, htmlContent) 
    VALUES (?, ?, ?, ?, ?)
  `,

  INSERT_EMAIL_ADDRESS: `
    INSERT INTO EmailAddress (emailId, type, address) 
    VALUES (?, ?, ?)
  `,

  GET_EMAILS_FOR_ADDRESS: `
    SELECT 
      Inbox.id,
      Email.subject,
      Email.createdAt,
      Email.expiresAt,
      (SELECT address FROM EmailAddress WHERE emailId = Email.id AND type = 'from') as fromAddress,
      (SELECT GROUP_CONCAT(address, ', ') FROM EmailAddress WHERE emailId = Email.id AND type = 'to') as toAddress
    FROM Email
    JOIN Inbox ON Email.id = Inbox.emailId
    WHERE Inbox.address = ?
  `,

  GET_INBOX_BY_ID: `
    SELECT 
      Inbox.id,
      Inbox.textContent, 
      Inbox.htmlContent, 
      Email.subject, 
      Email.expiresAt,
      Email.createdAt,
      (SELECT address FROM EmailAddress WHERE emailId = Email.id AND type = 'from') as fromAddress,
      (SELECT GROUP_CONCAT(address, ', ') FROM EmailAddress WHERE emailId = Email.id AND type = 'to') as toAddress
    FROM Inbox
    JOIN Email ON Inbox.emailId = Email.id
    WHERE Inbox.id = ?
  `,

  DELETE_BY_INBOX_ID: `
    DELETE FROM Inbox WHERE id = ?
  `,

  DELETE_EXPIRED_ENTRIES: `
    DELETE FROM Email WHERE expiresAt < strftime('%s', 'now') * 1000
  `
};
