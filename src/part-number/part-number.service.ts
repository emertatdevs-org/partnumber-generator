import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class PartNumberService {
  // تعریف پیشوندها، بخش‌های میانی و پسوندها برای هر سازنده
  private manufacturers = {
    AATC: {
      prefixPatterns: [
        "AD", "AMF", "AC", "AS", "AX", "AZ", "AMB"
      ],
      middlePatterns: [
        "[0-9]{2}[A-Z][0-9]{1,3}[A-Z]?",
        "[A-Z][0-9]{2}[A-Z]{1,2}[0-9]",
        "[0-9]{4}",
        "[A-Z0-9]{3,5}"
      ],
      suffixes: [
        "-CR", "-LF", "-RP", "-P14", "-IP67"
      ]
    },
    AcSiP: {
      prefixPatterns: [
        "AIM", "AIMB"
      ],
      middlePatterns: [
        "[A-Z][0-9]{3}[A-Z0-9]{0,3}",
        "[A-Z]{3}[0-9]{2,3}[A-Z]?"
      ],
      suffixes: []
    },
    AEM: {
      prefixPatterns: [
        "P700L", "HRB0805S", "HRB1206S", "HRB0603S", "P600L"
      ],
      middlePatterns: [
        "[0-9]{2,3}-[0-9]+\\.[0-9]{1,2}",
        "[A-Z0-9]{6,8}"
      ],
      suffixes: []
    }
  };

  // تابع تولید پارت‌نامبرها بر اساس الگوها
  generatePartNumbers() {
    const allPartNumbers = [];

    for (let manufacturer in this.manufacturers) {
      const { prefixPatterns, middlePatterns, suffixes } = this.manufacturers[manufacturer];

      prefixPatterns.forEach(prefix => {
        middlePatterns.forEach(middlePattern => {
          const middle = this.generateMiddlePart(middlePattern);

          if (suffixes.length > 0) {
            suffixes.forEach(suffix => {
              const partNumber = `${prefix}-${middle}${suffix}`;
              allPartNumbers.push({ manufacturer, partNumber });
            });
          } else {
            const partNumber = `${prefix}-${middle}`;
            allPartNumbers.push({ manufacturer, partNumber });
          }
        });
      });
    }

    return allPartNumbers;
  }

  // تابع برای تولید بخش میانی براساس یک الگوی منظم (Regex)
  generateMiddlePart(pattern: string): string {
    const regex = new RegExp(pattern);
    const RandExp = require('randexp');
    return new RandExp(regex).gen();
  }

  // ذخیره پارت‌نامبرها در یک فایل JSON
  savePartNumbersToJson(filename: string) {
    const partNumbers = this.generatePartNumbers();
    const jsonContent = JSON.stringify(partNumbers, null, 2);

    fs.writeFileSync(filename, jsonContent, 'utf8');
    console.log(`Part numbers saved to ${filename}`);
  }
}
