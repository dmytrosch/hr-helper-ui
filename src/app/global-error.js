'use client';

import Result from 'antd/lib/result';
import Button from 'antd/lib/button';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div style={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: '#fff' 
        }}>
          <Result
            status="500"
            title={error.name}
            subTitle={error.message}
            extra={
              <Button type="primary" onClick={() => reset()}>
                Try to Recover
              </Button>
            }
          />
        </div>
      </body>
    </html>
  );
}