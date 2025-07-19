import { spawn } from 'child_process';
import path from 'path';
import { StockData } from '@shared/schema';

export class StockService {
  async getStockData(symbol: string): Promise<StockData> {
    return new Promise((resolve, reject) => {
      const pythonScript = path.join(process.cwd(), 'python_scripts', 'stock_fetcher.py');
      const pythonProcess = spawn('python3', [pythonScript, symbol]);

      let dataString = '';
      let errorString = '';

      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python script failed: ${errorString}`));
          return;
        }

        try {
          const stockData = JSON.parse(dataString);
          resolve(stockData);
        } catch (error) {
          reject(new Error(`Failed to parse stock data: ${error}`));
        }
      });
    });
  }

  async validateSymbol(symbol: string): Promise<boolean> {
    try {
      await this.getStockData(symbol);
      return true;
    } catch {
      return false;
    }
  }
}

export const stockService = new StockService();
