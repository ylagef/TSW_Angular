<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\GapsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\GapsTable Test Case
 */
class GapsTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\GapsTable
     */
    public $Gaps;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.gaps'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Gaps') ? [] : ['className' => GapsTable::class];
        $this->Gaps = TableRegistry::getTableLocator()->get('Gaps', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Gaps);

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
