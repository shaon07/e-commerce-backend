// ddMiddleware.js

// Custom function to handle circular references
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return "[Circular]";
        }
        seen.add(value);
      }
      return value;
    };
  };
  
  export const ddMiddleware = (req, res, next) => {
    res.dd = (data) => {
      res.setHeader('Content-Type', 'text/html');
      try {
        const jsonString = JSON.stringify(data, getCircularReplacer(), 2);
        res.status(200).send(`<pre>${jsonString}</pre>`);
      } catch (err) {
        res.status(500).send('<pre>Error stringifying data</pre>');
      }
      res.end(); // Ensure no further processing
    };
    next();
  };
  
  