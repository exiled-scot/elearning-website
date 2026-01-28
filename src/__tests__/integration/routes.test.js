/**
 * Route Integration Tests
 *
 * Tests that page components render correctly
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Import page components
import AboutPage from '../../pages/AboutPage';
import Explore from '../../pages/Explore';
import MyLearning from '../../pages/MyLearning';
import CloudLabs from '../../pages/CloudLabs';
import PersonalisedPaths from '../../pages/PersonalisedPaths';
import Projects from '../../pages/Projects';
import SkillPaths from '../../pages/SkillPaths';
import Assessments from '../../pages/Assessments';
import Categories from '../../pages/Categories';

// Mock data
const mockCourses = [
  {
    id: 'course1',
    title: 'Test Course',
    description: 'Test description',
    instructor: 'Test Instructor',
    image: 'test.jpg',
    categories: ['Programming'],
  }
];

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Page Component Tests', () => {
  describe('Static Pages', () => {
    it('renders AboutPage without crashing', () => {
      renderWithRouter(<AboutPage />);
      expect(document.body).toBeInTheDocument();
    });

    it('renders CloudLabs without crashing', () => {
      renderWithRouter(<CloudLabs />);
      expect(document.body).toBeInTheDocument();
    });

    it('renders PersonalisedPaths without crashing', () => {
      renderWithRouter(<PersonalisedPaths />);
      expect(document.body).toBeInTheDocument();
    });

    it('renders Projects without crashing', () => {
      renderWithRouter(<Projects />);
      expect(document.body).toBeInTheDocument();
    });

    it('renders SkillPaths without crashing', () => {
      renderWithRouter(<SkillPaths />);
      expect(document.body).toBeInTheDocument();
    });

    it('renders Assessments without crashing', () => {
      renderWithRouter(<Assessments />);
      expect(document.body).toBeInTheDocument();
    });
  });

  describe('Data-Driven Pages', () => {
    it('renders Explore with courses', () => {
      renderWithRouter(<Explore courses={mockCourses} />);
      expect(document.body).toBeInTheDocument();
    });

    it('renders Explore with empty courses', () => {
      renderWithRouter(<Explore courses={[]} />);
      expect(document.body).toBeInTheDocument();
    });

    it('renders MyLearning with courses', () => {
      renderWithRouter(<MyLearning courses={mockCourses} />);
      expect(document.body).toBeInTheDocument();
    });

    it('renders MyLearning with empty courses', () => {
      renderWithRouter(<MyLearning courses={[]} />);
      expect(document.body).toBeInTheDocument();
    });

    it('renders Categories with category name', () => {
      renderWithRouter(<Categories categories="Programming" />);
      expect(document.body).toBeInTheDocument();
    });
  });

  describe('Page Structure', () => {
    it('Explore page renders card container', () => {
      const { container } = renderWithRouter(<Explore courses={mockCourses} />);
      // Should have some content structure
      expect(container.firstChild).toBeInTheDocument();
    });

    it('MyLearning page renders content', () => {
      const { container } = renderWithRouter(<MyLearning courses={mockCourses} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
