# Gifs App Development Guidelines

This document provides guidelines and instructions for developing and maintaining the Gifs App project.

## Build/Configuration Instructions

### Prerequisites
- Node.js (v14 or higher)
- Angular CLI (v19.2.0)

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Configuration
The application uses environment files for configuration:
- `src/environments/environment.ts` - Production environment
- `src/environments/environment.development.ts` - Development environment

Both files should contain the following properties:
```typescript
export const environment = {
  production: boolean,
  companyName: string,
  companySecName: string,
  companySlogan: string,
  giphyApiKey: string,
  giphyEndpoint: string
};
```

To use a different environment configuration for development, update the `environment.development.ts` file with appropriate values.

### Running the Application
- Development server:
  ```bash
  npm start
  ```
  This will start the application in development mode at `http://localhost:4200/`.

- Production build:
  ```bash
  npm run build
  ```
  This will create a production build in the `dist/` directory.

## Testing Information

### Testing Framework
The project uses Jasmine and Karma for testing, which is the standard testing setup for Angular applications.

### Running Tests
- Run all tests:
  ```bash
  npm test
  ```

- Run specific tests:
  ```bash
  npm test -- --include=path/to/test/file.spec.ts
  ```

### Writing Tests

#### Component Tests
For component tests, follow this pattern:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourComponent } from './your.component';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests as needed
});
```

#### Service Tests with HTTP Dependencies
For services with HTTP dependencies, use HttpClientTestingModule:
```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { YourService } from './your.service';

describe('YourService', () => {
  let service: YourService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YourService]
    });
    service = TestBed.inject(YourService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add more tests as needed
});
```

### Test Example
Here's an example of testing the GifService:

```typescript
// src/app/gifs/services/gif.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GifService } from './gif.service';
import { environment } from '@environments/environment';

describe('GifService', () => {
  let service: GifService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GifService]
    });
    service = TestBed.inject(GifService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load trending gifs on initialization', () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          title: 'Test GIF',
          images: {
            original: {
              url: 'https://example.com/gif.gif'
            }
          }
        }
      ],
      meta: { status: 200, msg: 'OK', response_id: 'abc123' },
      pagination: { total_count: 1, count: 1, offset: 0 }
    };

    const req = httpMock.expectOne(
      `${environment.giphyEndpoint}/gifs/trending?api_key=${environment.giphyApiKey}&limit=24`
    );
    req.flush(mockResponse);

    expect(service.trendingGifs().length).toBe(1);
    expect(service.trendingGifsLoading()).toBe(false);
  });
});
```

## Additional Development Information

### Project Structure
- `src/app/gifs/` - Main application module
  - `components/` - Reusable UI components
  - `interfaces/` - TypeScript interfaces
  - `mapper/` - Data transformation utilities
  - `pages/` - Page components
  - `services/` - Angular services

### State Management
The application uses Angular's Signal API for state management. Signals are used to:
- Track loading states
- Store and retrieve data
- Compute derived state

Example:
```typescript
// Define a signal
myData = signal<MyType[]>([]);

// Update a signal
myData.set(newData);

// Create a computed signal
derivedData = computed(() => {
  // Transform or filter myData()
  return transformedData;
});
```

### API Integration
The application integrates with the Giphy API. API calls are made using Angular's HttpClient in services.

### Styling
The application uses TailwindCSS for styling. Utility classes are applied directly in the HTML templates.

### Component Pattern
The application follows Angular's standalone component pattern, using the `imports` array instead of NgModule declarations.
