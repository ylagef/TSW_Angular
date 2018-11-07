<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Gap Entity
 *
 * @property int $gap_id
 * @property int $poll_id
 * @property \Cake\I18n\FrozenTime $start_date
 * @property \Cake\I18n\FrozenTime $end_date
 */
class Gap extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'poll_id' => true,
        'start_date' => true,
        'end_date' => true
    ];
}
