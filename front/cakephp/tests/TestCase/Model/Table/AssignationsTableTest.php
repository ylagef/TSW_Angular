<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\AssignationsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\AssignationsTable Test Case
 */
class AssignationsTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\AssignationsTable
     */
    public $Assignations;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.assignations'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Assignations') ? [] : ['className' => AssignationsTable::class];
        $this->Assignations = TableRegistry::getTableLocator()->get('Assignations', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Assignations);

        parent::tearDown();
    }

    /**
     * Test initialize method
     *
     * @return void
     */
    public function testInitialize()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test validationDefault method
     *
     * @return void
     */
    public function testValidationDefault()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
