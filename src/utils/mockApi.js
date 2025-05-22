// Моки для тестирования функциональности без доступа к реальному API

// Мок для проверки авторизации
export const mockLogin = {
  login: 'sf_student1',
  password: '4i2385j'
};

// Мок для ответа авторизации
export const mockAuthResponse = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  expire: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Срок действия токена 1 день
};

// Мок для информации об аккаунте
export const mockAccountInfo = {
  eventFiltersInfo: {
    usedCompanyCount: 34,
    companyLimit: 1000
  }
};

// Мок для гистограмм
export const mockHistograms = {
  data: [
    {
      data: [
        { date: '2023-01-01T03:00:00+03:00', value: 12 },
        { date: '2023-02-01T03:00:00+03:00', value: 8 },
        { date: '2023-03-01T03:00:00+03:00', value: 15 }
      ],
      histogramType: 'totalDocuments'
    },
    {
      data: [
        { date: '2023-01-01T03:00:00+03:00', value: 3 },
        { date: '2023-02-01T03:00:00+03:00', value: 1 },
        { date: '2023-03-01T03:00:00+03:00', value: 4 }
      ],
      histogramType: 'riskFactors'
    }
  ]
};

// Мок для результатов поиска
export const mockSearchResults = {
  items: [
    {
      encodedId: 'mock-id-1',
      influence: 700.0,
      similarCount: 3
    },
    {
      encodedId: 'mock-id-2',
      influence: 607.0,
      similarCount: 8
    },
    {
      encodedId: 'mock-id-3',
      influence: 542.0,
      similarCount: 5
    }
  ]
};

// Мок для документов
export const mockDocuments = [
  {
    ok: {
      id: 'mock-id-1',
      issueDate: '2023-03-15T09:44:00+03:00',
      url: 'https://example.com/news/1',
      source: {
        name: 'Пример новостного сайта'
      },
      title: {
        text: 'Важная новость для компании'
      },
      content: {
        markup: 'Текст важной новости с упоминанием компании в деловом контексте'
      },
      attributes: {
        isTechNews: false,
        isAnnouncement: false,
        isDigest: false,
        wordCount: 150
      }
    }
  },
  {
    ok: {
      id: 'mock-id-2',
      issueDate: '2023-03-10T11:20:00+03:00',
      url: 'https://example.com/news/2',
      source: {
        name: 'Другой новостной сайт'
      },
      title: {
        text: 'Риск-факторы в отрасли'
      },
      content: {
        markup: 'Обзор рисков в отрасли с упоминанием нескольких компаний'
      },
      attributes: {
        isTechNews: false,
        isAnnouncement: false,
        isDigest: true,
        wordCount: 320
      }
    }
  }
];

// Функция для имитации задержки ответа API
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Мок API для имитации работы с API Interfax
export const mockApi = {
  login: async (loginData) => {
    await delay(800);
    
    if (loginData.login === mockLogin.login && loginData.password === mockLogin.password) {
      return mockAuthResponse;
    } else {
      throw new Error('Неверные учетные данные');
    }
  },
  
  getAccountInfo: async () => {
    await delay(500);
    return mockAccountInfo;
  },
  
  getHistograms: async () => {
    await delay(1200);
    return mockHistograms;
  },
  
  searchPublications: async () => {
    await delay(1500);
    return mockSearchResults;
  },
  
  getDocuments: async () => {
    await delay(1000);
    return mockDocuments;
  }
}; 