import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import {
  analyzeEducationPassport,
  matchOpportunities,
  recommendNextBestActions,
  analyzeEducationDocument,
  simulatePathway,
  advisorChat,
  explainOpportunityMatch,
  draftApplicationDocument,
  evaluateSingleNextBestAction,
} from './server/geminiService';
import {
  fetchServerDriveFiles,
  fetchServerGmailMessages,
  fetchServerCalendarEvents,
  createServerCalendarEvent,
  createServerGoogleDoc,
  fetchServerGoogleTasks,
  createServerGoogleTask,
  updateServerGoogleTaskStatus,
} from './server/workspaceServer';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'CampusFlow City API',
      timestamp: new Date().toISOString(),
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  app.get('/api/gemini/health', (req, res) => {
    res.json({
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      model: 'gemini-flash-latest',
    });
  });

  // 2. Education Passport AI Analysis
  app.post('/api/gemini/passport-analysis', async (req, res) => {
    try {
      const { user, passport } = req.body;
      if (!user || !passport) {
        return res.status(400).json({ error: 'Missing required user or passport data' });
      }

      const result = await analyzeEducationPassport(user, passport);
      res.json(result);
    } catch (error: any) {
      console.error('Gemini passport analysis error:', error);
      res.status(500).json({
        error: error?.message || 'Failed to analyze education passport with Gemini',
      });
    }
  });

  // 3. Opportunity Matching
  app.post('/api/gemini/opportunity-matching', async (req, res) => {
    try {
      const { user, items } = req.body;
      if (!user || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Missing user or items array' });
      }

      const results = await matchOpportunities(user, items);
      res.json(results);
    } catch (error: any) {
      console.error('Gemini opportunity matching error:', error);
      res.status(500).json({
        error: error?.message || 'Failed to rank opportunities with Gemini',
      });
    }
  });

  // 4. Next Best Action
  app.post('/api/gemini/next-best-actions', async (req, res) => {
    try {
      const { user, deadlines, applications, documents, scholarships, driveDocuments, admissionsEmails, calendarEvents } = req.body;
      if (!user) {
        return res.status(400).json({ error: 'Missing user profile' });
      }

      const actions = await recommendNextBestActions(
        user,
        deadlines || [],
        applications || [],
        documents || [],
        scholarships || [],
        driveDocuments || [],
        admissionsEmails || [],
        calendarEvents || []
      );
      res.json(actions);
    } catch (error: any) {
      console.error('Gemini next best actions error:', error);
      res.status(500).json({
        error: error?.message || 'Failed to compute next best actions with Gemini',
      });
    }
  });

  // 4b. Analyze Document with Gemini
  app.post('/api/gemini/analyze-document', async (req, res) => {
    try {
      const { user, document, application } = req.body;
      if (!user || !document) {
        return res.status(400).json({ error: 'Missing user profile or document' });
      }

      const analysis = await analyzeEducationDocument(user, document, application);
      res.json(analysis);
    } catch (error: any) {
      console.error('Gemini document analysis error:', error);
      res.status(500).json({
        error: error?.message || 'Failed to analyze document with Gemini',
      });
    }
  });

  // 5. Pathway Simulator
  app.post('/api/gemini/pathway-simulator', async (req, res) => {
    try {
      const { user, careerGoal, budget, location, academicProfile } = req.body;
      if (!user) {
        return res.status(400).json({ error: 'Missing user profile' });
      }

      const pathway = await simulatePathway(
        user,
        careerGoal || user.careerGoal || '',
        budget || user.budget || '',
        location || user.preferredLocation || (user.targetCountries?.length ? user.targetCountries.join(', ') : ''),
        academicProfile || {
          gpa: user.gpa,
          sat: user.satScore,
          ielts: user.ieltsScore,
          ecTier: 7,
        }
      );
      res.json(pathway);
    } catch (error: any) {
      console.error('Gemini pathway simulation error:', error);
      res.status(500).json({
        error: error?.message || 'Failed to generate pathway with Gemini',
      });
    }
  });

  // 6. AI Advisor Chat
  app.post('/api/gemini/advisor-chat', async (req, res) => {
    try {
      const { user, messages, query, contextData } = req.body;
      if (!user || !query) {
        return res.status(400).json({ error: 'Missing user or query' });
      }

      const response = await advisorChat(user, messages || [], query, contextData);
      res.json(response);
    } catch (error: any) {
      console.error('Gemini advisor chat error:', error);
      res.status(500).json({
        error: error?.message || 'Failed to generate advisor response with Gemini',
      });
    }
  });

  // 6b. Explain Opportunity Match in Education City
  app.post('/api/gemini/explain-opportunity-match', async (req, res) => {
    try {
      const { user, passport, place } = req.body;
      if (!place) {
        return res.status(400).json({ error: 'Missing place data' });
      }

      const explanation = await explainOpportunityMatch(user || {}, passport || {}, place);
      res.json(explanation);
    } catch (error: any) {
      console.error('Gemini explain opportunity match error:', error);
      res.status(500).json({
        error: error?.message || 'Failed to explain opportunity match with Gemini',
      });
    }
  });

  // 7. Google Workspace Server Proxies (React never handles raw Google API tokens directly)
  // GET Drive Files
  app.get('/api/workspace/drive/files', async (req, res) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';

      if (!token) {
        return res.status(401).json({
          success: false,
          mode: 'prototype',
          error: 'No Drive authorization token provided',
          files: [],
        });
      }

      const files = await fetchServerDriveFiles(token);
      res.json({
        success: true,
        mode: 'live',
        files,
      });
    } catch (error: any) {
      console.error('Server Google Drive error:', error?.message);
      res.status(400).json({
        success: false,
        mode: 'prototype',
        error: error?.message || 'Failed to fetch files from Google Drive',
        files: [],
      });
    }
  });

  // GET Gmail Admissions Messages
  app.get('/api/workspace/gmail/messages', async (req, res) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';

      if (!token) {
        return res.status(401).json({
          success: false,
          mode: 'prototype',
          error: 'No Gmail authorization token provided',
          messages: [],
        });
      }

      const messages = await fetchServerGmailMessages(token);
      res.json({
        success: true,
        mode: 'live',
        messages,
      });
    } catch (error: any) {
      console.error('Server Gmail error:', error?.message);
      res.status(400).json({
        success: false,
        mode: 'prototype',
        error: error?.message || 'Failed to fetch messages from Gmail',
        messages: [],
      });
    }
  });

  // GET Calendar Events
  app.get('/api/workspace/calendar/events', async (req, res) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';

      if (!token) {
        return res.status(401).json({
          success: false,
          mode: 'prototype',
          error: 'No Calendar authorization token provided',
          events: [],
        });
      }

      const events = await fetchServerCalendarEvents(token);
      res.json({
        success: true,
        mode: 'live',
        events,
      });
    } catch (error: any) {
      console.error('Server Google Calendar error:', error?.message);
      res.status(400).json({
        success: false,
        mode: 'prototype',
        error: error?.message || 'Failed to fetch events from Google Calendar',
        events: [],
      });
    }
  });

  // POST Calendar Event (Requires explicit confirmation)
  app.post('/api/workspace/calendar/events', async (req, res) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';

      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'Google Calendar authorization token required',
        });
      }

      const result = await createServerCalendarEvent(token, req.body);
      res.json({
        success: true,
        event: result,
      });
    } catch (error: any) {
      console.error('Server create calendar event error:', error?.message);
      res.status(400).json({
        success: false,
        error: error?.message || 'Failed to create calendar event on Google Calendar',
      });
    }
  });

  // GEMINI: Application Studio Draft (SOP, Personal Statement, Study Plan, Resume)
  app.post('/api/gemini/draft-application-doc', async (req, res) => {
    try {
      const result = await draftApplicationDocument(req.body);
      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      console.error('Draft application doc error:', error?.message);
      res.status(500).json({
        success: false,
        error: error?.message || 'Failed to generate application draft',
      });
    }
  });

  // GEMINI: "Your Next Best Action" (7-pillar connected synthesis)
  app.post('/api/gemini/single-next-best-action', async (req, res) => {
    try {
      const result = await evaluateSingleNextBestAction(req.body);
      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      console.error('Single next best action error:', error?.message);
      res.status(500).json({
        success: false,
        error: error?.message || 'Failed to evaluate next best action',
      });
    }
  });

  // WORKSPACE: Create Google Doc
  app.post('/api/workspace/docs/create', async (req, res) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';

      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'Google Docs authorization token required. Please connect Google Docs.',
        });
      }

      const result = await createServerGoogleDoc(token, req.body);
      res.json({
        success: true,
        doc: result,
      });
    } catch (error: any) {
      console.error('Server create Google Doc error:', error?.message);
      res.status(400).json({
        success: false,
        error: error?.message || 'Failed to create Google Doc',
      });
    }
  });

  // WORKSPACE: Fetch Google Tasks
  app.get('/api/workspace/tasks', async (req, res) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';

      if (!token) {
        return res.status(401).json({
          success: false,
          mode: 'prototype',
          error: 'Google Tasks authorization token required',
          tasks: [],
        });
      }

      const tasks = await fetchServerGoogleTasks(token);
      res.json({
        success: true,
        mode: 'live',
        tasks,
      });
    } catch (error: any) {
      console.error('Server fetch Google Tasks error:', error?.message);
      res.status(400).json({
        success: false,
        mode: 'prototype',
        error: error?.message || 'Failed to fetch tasks from Google Tasks',
        tasks: [],
      });
    }
  });

  // WORKSPACE: Create Google Task (Requires explicit confirmation)
  app.post('/api/workspace/tasks', async (req, res) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';

      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'Google Tasks authorization token required',
        });
      }

      const result = await createServerGoogleTask(token, req.body);
      res.json({
        success: true,
        task: result,
      });
    } catch (error: any) {
      console.error('Server create Google Task error:', error?.message);
      res.status(400).json({
        success: false,
        error: error?.message || 'Failed to create task on Google Tasks',
      });
    }
  });

  // WORKSPACE: Update Google Task Status
  app.patch('/api/workspace/tasks/:taskId', async (req, res) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';

      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'Google Tasks authorization token required',
        });
      }

      const { taskId } = req.params;
      const { completed } = req.body;
      const result = await updateServerGoogleTaskStatus(token, taskId, Boolean(completed));
      res.json(result);
    } catch (error: any) {
      console.error('Server update Google Task status error:', error?.message);
      res.status(400).json({
        success: false,
        error: error?.message || 'Failed to update Google Task status',
      });
    }
  });


  // Mount Vite or static files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
});
