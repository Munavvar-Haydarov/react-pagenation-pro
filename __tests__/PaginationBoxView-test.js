import React from 'react';
import ReactDOM from 'react-dom';
import PaginationBoxView from './../react_components/PaginationBoxView';
import PaginationListView from './../react_components/PaginationListView';
import PageView from './../react_components/PageView';
import ReactTestUtils from 'react-addons-test-utils';


describe('PaginationBoxView', () => {
  const pagination = ReactTestUtils.renderIntoDocument(
    <PaginationBoxView />
  );

  it('should render a pagination component', () => {
    expect(ReactDOM.findDOMNode(pagination).nodeName).toEqual("UL");

    ReactTestUtils.scryRenderedComponentsWithType(pagination, PaginationListView);

    expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("1");

    const pages = ReactDOM.findDOMNode(pagination).querySelectorAll("li");
    expect(pages.length).toEqual(8);
  });

  it('test previous and next buttons', () => {
    let elmts = ReactTestUtils.scryRenderedDOMComponentsWithTag(pagination, 'li');
    let previous = elmts[0];
    let next = elmts[elmts.length - 1];

    ReactTestUtils.Simulate.click(next);

    expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("2");

    ReactTestUtils.Simulate.click(previous);

    expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("1");
  });

  it('test click on a page item', () => {
    ReactTestUtils.findRenderedComponentWithType(pagination, PaginationListView);

    const pageItem = ReactDOM.findDOMNode(pagination).querySelector("li:nth-child(3)").querySelector("a");

    ReactTestUtils.Simulate.click(pageItem);

    expect(ReactDOM.findDOMNode(pagination).querySelector(".selected a").textContent).toBe("3");
  });

  it('test rendering only active page item', function() {
    const smallPagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView pageRangeDisplayed={0} marginPagesDisplayed={0} initialSelected={1} />
    );
    const pageItems = ReactDOM.findDOMNode(smallPagination).querySelectorAll("li");
    // Prev, current, next
    expect(pageItems.length).toBe(3);
  });
});
