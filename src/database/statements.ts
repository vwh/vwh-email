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

  // Create indexes
  CREATE_INDEX: `
    CREATE INDEX IF NOT EXISTS idx_email_id ON EmailAddress(emailId);
    CREATE INDEX IF NOT EXISTS idx_inbox_address ON Inbox(address);
  `,

  // PRAGMA settings for performance optimization
  PRAGMA: `
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    `,

  // Insert statement for Email
  INSERT_EMAIL: `
    INSERT INTO Email 
    (subject, expiresAt)
    VALUES (?, ?)
    `,

  // Insert statement for Inbox
  INSERT_INBOX: `
    INSERT INTO Inbox 
    (id, emailId, address, type, textContent, htmlContent) 
    VALUES (?, ?, ?, ?, ?, ?)
    `,

  // Insert statement for EmailAddress
  INSERT_EMAIL_ADDRESS: `
    INSERT INTO EmailAddress 
    (emailId, type, address)
    VALUES (?, ?, ?)
    `,

  // For fetching emails for a specific address
  GET_EMAILS_FOR_ADDRESS: `
    SELECT 
      Inbox.id,
      Email.subject,
      Email.createdAt,
      Email.expiresAt,
      (SELECT EmailAddress.address 
      FROM EmailAddress 
      WHERE EmailAddress.emailId = Email.id AND EmailAddress.type = 'from') as fromAddress,
      GROUP_CONCAT(
        CASE 
          WHEN EmailAddress.type = 'to' THEN EmailAddress.address 
          ELSE NULL 
        END, ', ') as toAddress,
      GROUP_CONCAT(
        CASE 
          WHEN EmailAddress.type = 'cc' THEN EmailAddress.address 
          ELSE NULL 
        END, ', ') as ccAddress,
      GROUP_CONCAT(
        CASE 
          WHEN EmailAddress.type = 'bcc' THEN EmailAddress.address 
          ELSE NULL 
        END, ', ') as bccAddress
    FROM Email
    JOIN Inbox ON Email.id = Inbox.emailId
    LEFT JOIN EmailAddress ON Email.id = EmailAddress.emailId
    WHERE Inbox.address = ?
    GROUP BY Email.id;
  `,

  // For fetching email by inbox ID (to get the full body)
  GET_INBOX_BY_ID: `
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

  // Delete email by inbox ID
  DELETE_BY_INBOX_ID: `
    DELETE FROM Inbox
    WHERE id = ?
  `,

  // To delete expired entries
  DELETE_EXPIRED_ENTRIES: `
    DELETE FROM Email
    WHERE expiresAt < strftime('%s', 'now') * 1000;
    `,
};
