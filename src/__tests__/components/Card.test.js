/**
 * Card Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Card from '../../components/Card';
import { mockCourses } from '../__mocks__/api';

// Helper to render with router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Card Component', () => {
  const courses = mockCourses;

  it('renders without crashing', () => {
    renderWithRouter(<Card courses={courses} />);
    expect(screen.getByText('Introduction to React')).toBeInTheDocument();
  });

  it('renders all provided courses', () => {
    renderWithRouter(<Card courses={courses} />);

    expect(screen.getByText('Introduction to React')).toBeInTheDocument();
    expect(screen.getByText('Advanced Python')).toBeInTheDocument();
    expect(screen.getByText('Web Development Fundamentals')).toBeInTheDocument();
  });

  it('displays course titles correctly', () => {
    renderWithRouter(<Card courses={courses} />);

    courses.forEach(course => {
      expect(screen.getByText(course.title)).toBeInTheDocument();
    });
  });

  it('displays course instructors', () => {
    renderWithRouter(<Card courses={courses} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
  });

  it('displays course descriptions', () => {
    renderWithRouter(<Card courses={courses} />);

    expect(screen.getByText('Learn the fundamentals of React development')).toBeInTheDocument();
    expect(screen.getByText('Master Python programming techniques')).toBeInTheDocument();
  });

  it('renders buy buttons for each course', () => {
    renderWithRouter(<Card courses={courses} />);

    const buyButtons = screen.getAllByText('Buy this course');
    expect(buyButtons).toHaveLength(courses.length);
  });

  it('creates correct links to course pages', () => {
    renderWithRouter(<Card courses={courses} />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/courses/course1');
    expect(links[1]).toHaveAttribute('href', '/courses/course2');
    expect(links[2]).toHaveAttribute('href', '/courses/course3');
  });

  it('handles empty courses array', () => {
    const { container } = renderWithRouter(<Card courses={[]} />);

    const cardContainer = container.querySelector('.card-container');
    expect(cardContainer).toBeInTheDocument();
    expect(cardContainer.children).toHaveLength(0);
  });

  it('applies hover class on mouse enter', () => {
    const { container } = renderWithRouter(<Card courses={[courses[0]]} />);

    const card = container.querySelector('.card');
    fireEvent.mouseEnter(card);

    expect(card).toHaveClass('hovered');
  });

  it('removes hover class on mouse leave', () => {
    const { container } = renderWithRouter(<Card courses={[courses[0]]} />);

    const card = container.querySelector('.card');
    fireEvent.mouseEnter(card);
    expect(card).toHaveClass('hovered');

    fireEvent.mouseLeave(card);
    expect(card).not.toHaveClass('hovered');
  });

  it('renders course images with correct src', () => {
    renderWithRouter(<Card courses={courses} />);

    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', expect.stringContaining('course1'));
    expect(images[1]).toHaveAttribute('src', expect.stringContaining('course2'));
  });
});
