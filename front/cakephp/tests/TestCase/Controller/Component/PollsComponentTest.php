<?php
namespace App\Test\TestCase\Controller\Component;

use App\Controller\Component\PollsComponent;
use Cake\Controller\ComponentRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Controller\Component\PollsComponent Test Case
 */
class PollsComponentTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Controller\Component\PollsComponent
     */
    public $Polls;

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $registry = new ComponentRegistry();
        $this->Polls = new PollsComponent($registry);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Polls);

        parent::tearDown();
    }

    /**
     * Test initial setup
     *
     * @return void
     */
    public function testInitialization()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
